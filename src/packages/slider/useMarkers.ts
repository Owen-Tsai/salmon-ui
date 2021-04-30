import {
  computed,
  ComputedRef
} from 'vue'

import {
  ISliderData,
  ISliderProps,
  Marker
} from './slider.type'

export const useStops = (
  props: ISliderProps,
  initData: ISliderData,
  minValue: ComputedRef<number>,
  maxValue: ComputedRef<number>
) => {
  const stops = computed(() => {
    if(!props.showStops || props.min > props.max) return
    if(props.step === 0) {
      process.env.NODE_ENV !== 'production' &&
      console.warn('[s-slider] Prop `step` cannot be 0')

      return []
    }

    const stepCount = (props.max - props.min) / props.step
    const stepWidth = 100 * props.step / (props.max - props.min)
    const result = Array.from<number>(
      { length: stepCount - 1 }).map(
        (_, index) => ((index + 1) * stepWidth)
    )

    if(props.range) {
      return result.filter((item) => {
        return item < 100 * (minValue.value - props.min) / (props.max - props.min) ||
          item > 100 * (maxValue.value - props.min) / (props.max - props.min)
      })
    } else {
      return result.filter(item =>
        item > 100 * (initData.firstValue - props.min) / (props.max - props.min)
      )
    }
  })

  const getStopStyle = (position: number) => {
    return (props.vertical ? { 'bottom': position + '%' } : { 'left': position + '%' })
  }

  return {
    stops,
    getStopStyle,
  }
}

export const useMarkers = (props: ISliderProps) => {
  if(!props.markers) {
    return []
  }

  const markerKeys = Object.keys(props.markers)
  return markerKeys.map(parseFloat)
    .sort((a, b) => a - b)
    .filter(point => point <= props.max && point >= props.min)
    .map((point): Marker => ({
      point,
      position: (point - props.min) * 100 / (props.max - props.min),
      marker: props.markers?.[point]
    }))
}
