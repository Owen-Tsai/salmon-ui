import {
  inject,
  ComputedRef,
  ref,
  computed
} from 'vue'

import debounce from 'lodash/debounce'

interface ISliderButtonProps {
  modelValue: number,
  vertical: boolean
}

interface ISliderButtonData {
  hovering: boolean
  dragging: boolean
  isClick: boolean
  startX: number
  currentX: number
  startY: number
  currentY: number
  startPosition: number
  newPosition: number
  oldValue: number
}

const useSliderTooltip = (
  props: ISliderButtonProps,
  formattedTooltip: ComputedRef<(val: number) => number | string>,
  showTooltip: ComputedRef<boolean>
) => {
  // states
  const tooltipEl = ref(null)
  const tooltipVisible = ref(false)

  // computed
  const formattedValue = computed(() => {
    return formatTooltip.value(props.modelValue) || props.modelValue
  })
}

const useSliderButton = (
  sliderButtonProps: ISliderButtonProps,
  initData: ISliderButtonData,
  emit
) => {
  const {
    disabled,
    min, max, step,
    showTooltip,
    precision,
    size,
    formatTooltip,
    emitChange,
    resetSize,
    updateFragging
  } = inject('sliderProps')
}
