import {
  computed, nextTick, ref, Ref, ComputedRef
} from 'vue'

import {
  ISliderProps,
  ISliderInitData,
  ButtonRefs
} from './slider.types'

export const useSlider = (
  props: ISliderProps, initData: ISliderInitData, emit
) => {
  const sliderEl = ref()
  const firstButton = ref()
  const secondButton = ref()

  const buttonRefs: ButtonRefs = {
    firstButton,
    secondButton,
  }

  const minValue = computed(() => {
    return Math.min(initData.firstValue, initData.secondValue)
  })
  const maxValue = computed(() => {
    return Math.max(initData.firstValue, initData.secondValue)
  })

  // slider track
  const trackThumbSize = computed(() => {
    return props.range
      ? `${ 100 * (maxValue.value - minValue.value) / (props.max - props.min) }%`
      : `${ 100 * (initData.firstValue - props.min) / (props.max - props.min) }%`
  })
  const trackThumbStart = computed(() => {
    return props.range
      ? `${ 100 * (minValue.value - props.min) / (props.max - props.min) }%`
      : '0%'
  })

  const trackStyle = computed(() => {
    return (props.vertical ? { height: props.height } : {}) as CSSStyleDeclaration
  })
  const trackThumbStyle = computed(() => {
    return (props.vertical
      ? {
        height: trackThumbSize.value,
        bottom: trackThumbStart.value,
      } : {
        width: trackThumbSize.value,
        left: trackThumbStart.value,
      }) as Partial<CSSStyleDeclaration>
  })

  const resetSize = () => {
    if (sliderEl.value) {
      initData.sliderSize = sliderEl.value[`client${ props.vertical ? 'Height' : 'Width' }`]
    }
  }

  const setPosition = (percent: number) => {
    const targetValue = props.min + percent * (props.max - props.min) / 100
    if (!props.range) {
      firstButton.value.setPosition(percent)
      return
    }
    let buttonRefName: string
    if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
      buttonRefName = initData.firstValue < initData.secondValue ? 'firstButton' : 'secondButton'
    } else {
      buttonRefName = initData.firstValue > initData.secondValue ? 'firstButton' : 'secondButton'
    }
    buttonRefs[buttonRefName].value.setPosition(percent)
  }

  const emitChange = async () => {
    await nextTick()
    emit('change', props.range ? [minValue.value, maxValue.value] : props.modelValue)
  }

  const onSliderClick = (event: MouseEvent) => {
    if (props.disabled || initData.dragging) return
    resetSize()
    if (props.vertical) {
      const sliderOffsetBottom = sliderEl.value.getBoundingClientRect().bottom
      setPosition((sliderOffsetBottom - event.clientY) / initData.sliderSize * 100)
    } else {
      const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
      setPosition((event.clientX - sliderOffsetLeft) / initData.sliderSize * 100)
    }
    emitChange()
  }

  return {
    sliderEl,
    firstButton,
    secondButton,
    minValue,
    maxValue,
    trackStyle,
    trackThumbStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderClick,
  }
}

export const use
