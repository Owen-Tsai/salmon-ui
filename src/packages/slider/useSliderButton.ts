import {
  inject,
  ComputedRef,
  ref,
  computed,
  nextTick,
  watch
} from 'vue'

import {
  ISliderButtonProps
} from './slider.types'
import debounce from 'lodash/debounce'

const useSliderTooltip = (
  props: ISliderButtonProps,
  formatTooltip: ComputedRef<(val: number) => number | string>,
  showTooltip: ComputedRef<boolean>
) => {
  // states
  const tooltipEl = ref(null)
  const tooltipVisible = ref(false)

  // computed
  const formattedValue = computed(() => {
    return formatTooltip.value(props.modelValue) || props.modelValue
  })

  // methods
  const displayTooltip = debounce(() => {
    showTooltip.value && (tooltipVisible.value = true)
  }, 50)
  const hideTooltip = debounce(() => {
    showTooltip.value && (tooltipVisible.value = false)
  }, 50)

  return {
    tooltipEl,
    tooltipVisible,
    formattedValue,
    displayTooltip,
    hideTooltip
  }
}

const useSliderButton = (
  props: ISliderButtonProps,
  initData: ISliderButtonData,
  emit
) => {
  const {
    disabled,
    min, max, step,
    showTooltip,
    precision,
    sliderSize,
    formatTooltip,
    emitChange,
    resetSize,
    updateDragging
  } = inject('sliderProps')

  const {
    tooltipEl,
    tooltipVisible,
    formattedValue,
    displayTooltip,
    hideTooltip
  } = useSliderTooltip(props, formatTooltip, showTooltip)

  // computed
  const currentPosition = computed(() => {
    return `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`
  })
  const buttonWrapperStyle = computed(() => {
    return (props.vertical ? { bottom: currentPosition.value } : { left: currentPosition.value })
  })

  // methods
  const handleMouseEnter = () => {
    initData.hovering = true
    displayTooltip()
  }
  const handleMouseLeave = () => {
    initData.hovering = false
    if (!initData.dragging) {
      hideTooltip()
    }
  }

  // bind mouse/touch events
  const onButtonDown = (event: MouseEvent | TouchEvent) => {
    if(disabled.value) return
    event.preventDefault()
    onDragStartHandler(event)
    window.addEventListener('mousemove', onDraggingHandler)
    window.addEventListener('touchmove', onDraggingHandler)
    window.addEventListener('mouseup', onDragEndHandler)
    window.addEventListener('touchend', onDragEndHandler)
    window.addEventListener('contextmenu', onDragEndHandler)
  }

  // bind keyboard events
  const onLeftKeyDown = () => {
    if(disabled.value) return
    initData.newPosition =
      parseFloat(currentPosition.value) - step.value / (max.value - min.value) * 100
    setPosition(initData.newPosition)
  }
  const onRightKeyDown = () => {
    if(disabled.value) return
    initData.newPosition =
      parseFloat(currentPosition.value) + step.value / (max.value - min.value) * 100
    setPosition(initData.newPosition)
  }

  /**
   * get the client X and Y value based on input event type
   * @param event mouse or touch event
   */
  const getClientXY = (event: MouseEvent | TouchEvent) => {
    let clientX: number
    let clientY: number

    if(event.type.startsWith('touch')) {
      clientY = (event as TouchEvent).touches[0].clientY
      clientX = (event as TouchEvent).touches[0].clientX
    } else {
      clientY = (event as MouseEvent).clientY
      clientX = (event as MouseEvent).clientX
    }

    return {
      clientX, clientY
    }
  }

  // event handlers
  const onDragStartHandler = (event: MouseEvent | TouchEvent) => {
    initData.dragging = true
    initData.isClick = true

    const { clientX, clientY } = getClientXY(event)

    // if the slider is vertical we do not need horizontal input value
    // vise versa
    if(props.vertical) {
      initData.startY = clientY
    } else {
      initData.startX = clientX
    }

    initData.startPosition = parseFloat(currentPosition.value)
    initData.newPosition = initData.startPosition
  }

  const onDraggingHandler = (event: MouseEvent | TouchEvent) => {
    if(initData.dragging) {
      initData.isClick = false
      displayTooltip()
      resetSize()

      let diff: number
      const { clientX, clientY } = getClientXY(event)
      if(props.vertical) {
        initData.currentY = clientY
        diff = (initData.startY - initData.currentY) / sliderSize.value * 100
      } else {
        initData.currentX = clientX
        diff = (initData.currentX - initData.startX) / sliderSize.value * 100
      }

      initData.newPosition = initData.startPosition + diff
      setPosition(initData.newPosition)
    }
  }

  const onDragEndHandler = () => {
    if(initData.dragging) {
      // setTimeOut to prevent the click event to be fired instantly
      // after mouseup event, which probably results in the sliderButton teleport issue
      // cannot use preventDefault since mouseup and click events
      // are not registered on the same DOM element
      setTimeout(() => {
        initData.dragging = false
        if (!initData.hovering) {
          hideTooltip()
        }
        if (!initData.isClick) {
          setPosition(initData.newPosition)
          emitChange()
        }
      }, 0)
      // remove registered listeners
      window.removeEventListener('mousemove', onDraggingHandler)
      window.removeEventListener('touchmove', onDraggingHandler)
      window.removeEventListener('mouseup', onDragEndHandler)
      window.removeEventListener('touchend', onDragEndHandler)
      window.removeEventListener('contextmenu', onDragEndHandler)
    }
  }

  const setPosition = async (newPosition: number) => {
    if(!newPosition || isNaN(newPosition)) return

    // clamp value between 0% and 100%
    if(newPosition < 0) {
      newPosition = 0
    } else if(newPosition > 100) {
      newPosition = 100
    }

    // if step props is set, then calculate corresponding position
    // and set the slider to nearest stepped position if not already
    const lengthPerStep = 100 / ((max.value - min.value) / step.value)
    const steps = Math.round(newPosition / lengthPerStep)

    let value = steps * lengthPerStep * (max.value - min.value) * 0.01 + min.value
    value = parseFloat(value.toFixed(precision.value))

    emit('update:modelValue', value)
    if (!initData.dragging && props.modelValue !== initData.oldValue) {
      initData.oldValue = props.modelValue
    }

    await nextTick()
    initData.dragging && displayTooltip()
    // tooltip.value.updatePopper()
  }

  watch(() => initData.dragging, val => {
    updateDragging(val)
  })

  return {
    tooltipEl,
    tooltipVisible,
    showTooltip,
    buttonWrapperStyle,
    formattedValue,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown,
    onLeftKeyDown,
    onRightKeyDown,
    setPosition,
  }
}

export default useSliderButton
