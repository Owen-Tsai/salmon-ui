import {
  Component,
  PropType,
  ExtractPropTypes,
  CSSProperties,
  Ref,
  computed
} from 'vue'

import { buildProp } from '@/utils/props'

type ProgressProps = ExtractPropTypes<typeof props>
type ColorsOption = {
  percentage: number,
  color: string
}

export const props = {
  type: buildProp({
    values: ['circular', 'gauge'],
  } as const),
  status: buildProp({
    values: ['success', 'error', 'active']
  } as const),
  percentage: buildProp({
    type: Number,
    required: true,
    validator: (val: number) => {
      return val >= 0 && val <= 100
    }
  } as const),
  finishIcon: {
    type: Object as PropType<Component>
  },
  strokeWidth: {
    type: Number as PropType<number>,
    default: 8
  },
  color: {
    type: [String, Function, Array] as PropType<
      string | ((v: number) => string) | ColorsOption[] | string
    >
  },
  // only available in circular and gauge mode
  size: {
    type: Number as PropType<number>,
    default: 128
  }
}

export const useCommonAttrs = (
  props: ProgressProps
) => {
  const strokeColor = computed(() => {
    if (props.status === 'success') {
      return '#16a34a'
    }
    if (props.status === 'error') {
      return '#dc2626'
    }

    return getCurrentColor(props.percentage)
  })

  const getCurrentColor = (percentage: number): string => {
    if (Array.isArray(props.color)) {
      return getLeveledColor(percentage)
    } else if (typeof props.color === 'function') {
      return props.color(percentage)
    }

    return props.color as string
  }

  const getLeveledColor = (percentage: number): string => {
    const arr = getColorsArray()

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].percentage > percentage) {
        return arr[i].color
      }
    }
    return arr[arr.length - 1].color
  }

  const getColorsArray = (): ColorsOption[] => {
    const colors = props.color as Array<ColorsOption | string>
    const span = 100 / colors.length
    return colors.map((obj, index) => {
      if (typeof obj === 'string') {
        return {
          color: obj,
          percentage: (index + 1) * span
        }
      }

      return obj
    })
  }

  return {
    strokeColor
  }
}

export const useLinearProgress = (
  props: ProgressProps,
  strokeColor: Ref<string>
) => {
  const fillStyle = computed<CSSProperties>(() => ({
    width: `${props.percentage}%`,
    backgroundColor: strokeColor.value
  }))

  return {
    fillStyle
  }
}

export const useNonLinearProgress = (props: ProgressProps) => {
  const relativeStrokeWidth = computed(() =>
    (props.strokeWidth / props.size * 100).toFixed(1)
  )

  const radius = computed(() =>
    parseInt(`${50 - parseFloat(relativeStrokeWidth.value) / 2}`, 10)
  )

  /**
     * M: starting point, absolute coordinates
     * m: starting point, dx and dy relatively to the current point
     * a: draw an arc curve
     */
  const trackPath = computed(() => {
    const r = radius.value
    const isGaugeMode = props.type === 'gauge'

    return `
      M 50 50
      m 0 ${isGaugeMode ? '' : '-'}${r}
      a ${r} ${r} 0 1 1 0 ${isGaugeMode ? '-' : ''}${r * 2}
      a ${r} ${r} 0 1 1 0 ${isGaugeMode ? '' : '-'}${r * 2}
    `
  })

  const perimeter = computed(() => 2 * Math.PI * radius.value)
  const rate = computed(() => props.type === 'gauge' ? 0.75 : 1)

  const strokeDashOffset = computed(() => {
    const offset = -1 * perimeter.value * (1 - rate.value) / 2
    return `${offset}px`
  })

  const trackPathStyle = computed(() => {
    return {
      strokeDasharray:
        `${(perimeter.value * rate.value)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashOffset.value
    }
  })

  const fillPathStyle = computed(() => {
    return {
      strokeDasharray:
        `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
      strokeDashoffset: strokeDashOffset.value,
      transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
    }
  })

  return {
    trackPath,
    trackPathStyle,
    fillPathStyle,
    relativeStrokeWidth
  }
}