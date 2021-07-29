const {
  rgbToHsv, rgbToHex, inputToRGB
} = require('@ctrl/tinycolor')

const hueStep = 2
const saturationStep1 = 0.16 // saturation adjust step for light variants
const saturationStep2 = 0.05 // for dark variants
const brightnessStep1 = 0.05 // lightness adjust step for light variants
const brightnessStep2 = 0.15 // for dark variants

const lightColorCount = 4
const darkColorCount = 4

// dark theme opacity adjustment
const darkColorMap = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
];

// Wrapper function ported from TinyColor.prototype.toHsv
// Keep it here because of `hsv.h * 360`
function toHsv({ r, g, b }) {
  const hsv = rgbToHsv(r, g, b);
  return { h: hsv.h * 360, s: hsv.s, v: hsv.v };
}

// Wrapper function ported from TinyColor.prototype.toHexString
// Keep it here because of the prefix `#`
function toHex({ r, g, b }) {
  return `#${rgbToHex(r, g, b, false)}`;
}

// Wrapper function ported from TinyColor.prototype.mix, not tree-shakable.
// Amount in range [0, 1]
// Assume color1 & color2 has no alpha, since the following src code did so.
function mix(rgb1, rgb2, amount) {
  const p = amount / 100;
  const rgb = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
  };
  return rgb;
}

function getHue(hsv, i, light = false) {
  let hue;
  // 根据色相不同，色相转向不同
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}

function getSaturation(hsv, i, light = false) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  let saturation;
  if (light) {
    saturation = hsv.s - saturationStep1 * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep1;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  // 边界值修正
  if (saturation > 1) {
    saturation = 1;
  }
  // 第一格的 s 限制在 0.06-0.1 之间
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
}

function getValue(hsv, i, light = false) {
  let value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2));
}

/*
  program entrance
*/

// parse args
const args = process.argv.slice(2)
if (args.length > 3) {
  console.error('Received more then 2 arguments.')
  return
} else if (args.length < 1) {
  console.error('No primary color is passed to the generator.')
  return
}

let color
if (args[0] === 'dark') {
  color = args[1]
} else {
  color = args[0]
}

const patterns = [];
const pColor = inputToRGB(color);

// light variants
for (let i = 1; i <= lightColorCount; i += 1) {
  const hsv = toHsv(pColor);
  const colorString = toHex(
    inputToRGB({
      h: getHue(hsv, lightColorCount - i + 1, true),
      s: getSaturation(hsv, lightColorCount - i + 1, true),
      v: getValue(hsv, lightColorCount - i + 1, true),
    }),
  );
  patterns.push(colorString)
}

// primary color
patterns.push(toHex(pColor))

// dark variants
for (let i = 1; i <= darkColorCount; i += 1) {
  const hsv = toHsv(pColor);
  const colorString = toHex(
    inputToRGB({
      h: getHue(hsv, i),
      s: getSaturation(hsv, i),
      v: getValue(hsv, i),
    }),
  );
  patterns.push(colorString)
}

// dark theme patterns
if (args.includes('dark')) {
  return darkColorMap.map(({ index, opacity }) => {
    const darkColorString = toHex(
      mix(inputToRGB('#141414'), inputToRGB(patterns[index]), opacity * 100),
    );
    return darkColorString;
  });
}

console.log(patterns.sort((a, b) => {
  return a - b
}))
