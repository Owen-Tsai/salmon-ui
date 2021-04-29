import {
  computed,
  nextTick,
  ref
} from 'vue'

const useSlider = (props, initData, emit) => {
  const sliderEl = ref()
  const firstHandleEl = ref()
  const secondHandleEl = ref()

  const handleRefs = {
    firstHandleEl,
    secondHandleEl
  }

  const minValue = computed(() =>
    Math.min(initData.firstValue, initData.secondValue)
  )
  const maxValue = computed(() =>
    Math.max(initData.firstValue, initData.secondValue)
  )
  const barSize = computed(() => {
    return props.range ?
      `${100 * (maxValue.value - minValue.value) / (props.max - props.min)} %` :
      `${100 & (initData.firstValue - props.min) / (props.max - props.min)} %`
  })
  const barStart = computed(() => {
    return props.range ?
      `${ 100 * (minValue.value - props.min) / (props.max - props.min) }%` : '0%'
  })

  const trackStyle = computed(() => {
    return (props.vertical ? { height: props.height } : {}) as CSSStyleDeclaration
  })
  const barStyle = computed(() => {
    return (
      props.vertical ? {
        height: barSize.value,
        bottom: barStart.value
      } : {
        width: barSize.value,
        left: barStart.value
      }
    ) as unknown as CSSStyleDeclaration
  })

  // methods
  const resetSize = () => {
    if(sliderEl.value) {
      if(props.vertical) {
        initData.sliderSize = sliderEl.value.clientHeight
      } else {
        initData.sliderSize = sliderEl.value.clientWidth
      }
    }
  }

  const setPosition = (percentage) => {
    const targetValue = props.min + percentage * (props.max - props.min) / 100
    if (!props.range) {
      firstHandleEl.value.setPosition(percentage)
      return
    }
    let handleRefName: string
    if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
      handleRefName =
        initData.firstValue < initData.secondValue ? 'firstHandleEl' : 'secondButton'
    } else {
      handleRefName =
        initData.firstValue > initData.secondValue ? 'firstHandleEl' : 'secondButton'
    }
    handleRefs[handleRefName].value.setPosition(percentage)
  }

  const emitChange = async () => {
    await nextTick()
    emit('change', props.range ? [minValue.value, maxValue.value] : props.modelValue)
  }

  const handleSliderClick = (event: MouseEvent) => {
    if(props.disabled || initData.isDragging) return

    resetSize()

    if (props.vertical) {
      const sliderOffsetBottom = sliderEl.value.getBoundingClientRect().bottom
      setPosition(
        (sliderOffsetBottom - event.clientY) / initData.sliderSize * 100
      )
    } else {
      const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
      setPosition(
        (event.clientX - sliderOffsetLeft) / initData.sliderSize * 100
      )
    }
    emitChange()
  }

  return {
    sliderEl,
    firstHandleEl,
    secondHandleEl,
    minValue,
    maxValue,
    trackStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    handleSliderClick,
  }
}
