import { computed, ComputedRef } from 'vue'
import { ISliderInitData, ISliderProps, Stops, Mark } from './slider.types'
import { warn } from '@/utils/class.error'

export const useStops = (
  props: ISliderProps,
  initData: ISliderInitData,
  minValue: ComputedRef<number>,
  maxValue: ComputedRef<number>
): Stops => {
  const stops = computed(() => {
    if (!props.showStops || props.min > props.max) return []

    if (props.step === 0) {
      process.env.NODE_ENV !== 'production' &&
      warn('s-slider', 'prop `step` should not be 0')
      return []
    }

    const stopCount = (props.max - props.min) / props.step
    const stepWidth = 100 * props.step / (props.max - props.min)
    const result =
      Array.from<number>({ length: stopCount - 1 })
        .map((_, index) => ((index + 1) * stepWidth))

    if (props.range) {
      return result.filter(step => {
        return step < (100 * (minValue.value - props.min) / (props.max - props.min))
          || step > (100 * (maxValue.value - props.min) / (props.max - props.min))
      })
    } else {
      return result.filter(step => step >
        (100 * (initData.firstValue - props.min) / (props.max - props.min))
      )
    }
  })

  const getStopStyle = (position: number) => {
    return (props.vertical ? { 'bottom': position + '%' } : { 'left': position + '%' })
  }

  return {
    stops,
    getStopStyle
  }
}

export const useMarks = (props: ISliderProps) => {
  return computed(() => {
    if (!props.marks) {
      return []
    }

    const marksKeys = Object.keys(props.marks)
    return marksKeys.map(parseFloat)
      .sort((a, b) => a - b)
      .filter(point => point <= props.max && point >= props.min)
      .map((point): Mark => ({
        point,
        position: (point - props.min) * 100 / (props.max - props.min),
        mark: props.marks ? props.marks[point] : undefined
      }))
  })
}
