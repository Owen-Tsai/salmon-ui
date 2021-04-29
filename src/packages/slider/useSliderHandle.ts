import {
  ref,
  computed,
  inject,
  nextTick,
  watch,
  watchEffect
} from 'vue'
import debounce from 'lodash/debounce'

const useTooltip = (props, formatTooltip, noTooltip) => {
  const tooltipEl = ref()
  const tooltipVisible = ref(false)

  const enableFormat = computed(() => {
    return formatTooltip.value instanceof Function
  })

  const formattedValue = computed(() => {
    return enableFormat.value && formatTooltip.value(props.modelValue) ||
      props.modelValue
  })

  // methods
  const displayTooltip = debounce(() => {
    !noTooltip.value && (tooltipVisible.value = true)
  }, 50)
  const hideTooltip = debounce(() => {
    !noTooltip.value && (tooltipVisible.value = false)
  })

  return {
    tooltipEl,
    tooltipVisible,
    formattedValue,
    displayTooltip,
    hideTooltip
  }
}

const useSliderHandle = (props, initData, emit) => {

}
