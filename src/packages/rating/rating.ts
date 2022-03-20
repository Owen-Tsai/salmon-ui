import type {
  PropType,
  ExtractPropTypes,
  Component,
  SetupContext,
  Ref
} from 'vue'

import {
  computed,
  ref,
  watch
} from 'vue'

import { StarFill } from '@salmon-ui/icons'

export const props = {
  modelValue: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  disabled: Boolean,
  allowHalf: Boolean,
  icon: {
    type: Object as PropType<Component>,
    default: StarFill
  },
  // if `texts` are set, show correspond text instead of the score
  showRatings: Boolean,
  texts: Array as PropType<string[]>,
  activeColor: {
    type: String,
    default: '#f59e0b'
  },
  inactiveColor: {
    type: String,
    default: '#f3f4f6'
  }
}

type RatingProp = ExtractPropTypes<typeof props>
type Emitter = SetupContext<('update:modelValue' | 'change')[]>['emit']

export const useRating = (props: RatingProp) => {
  // the real value at the moment
  const currentValue = ref(props.modelValue)
  // index of the icon that is pointed
  const hoverIndex = ref(-1)

  const isPointingAtHalf = ref(true)

  const text = computed(() => {
    if (props.showRatings) {
      return props.texts
        ? props.texts[Math.ceil(currentValue.value) - 1]
        : String(currentValue.value)
    }

    return ''
  })

  const decimalValue = computed(() =>
    props.modelValue * 100 - Math.floor(props.modelValue) * 100
  )

  const showDecimalIcon = (idx: number) => {
    const showWhenDisabled = props.disabled &&
      decimalValue.value > 0 &&
      idx - 1 < props.modelValue &&
      idx > props.modelValue

    const showWhenAllowHalf = props.allowHalf &&
      isPointingAtHalf.value &&
      idx - 0.5 <= currentValue.value &&
      idx > currentValue.value

    return showWhenAllowHalf || showWhenDisabled
  }

  watch(() => props.modelValue, (val) => {
    currentValue.value = val
    isPointingAtHalf.value = props.modelValue !== Math.floor(props.modelValue)
  })

  watch(() => hoverIndex.value, (val) => {
    if (val === -1) {
      if (currentValue.value !== props.modelValue) {
        currentValue.value = props.modelValue
      }
    }
  })

  return {
    currentValue,
    hoverIndex,
    isPointingAtHalf,
    text,
    decimalValue,
    showDecimalIcon
  }
}

export const useStyles = (
  props: RatingProp,
  decimalValue: Ref<number>,
  currentValue: Ref<number>
) => {
  const decimalIconStyle = computed(() => {
    let width = ''

    if (props.disabled) {
      width = `calc(${decimalValue.value}% - 3px)`
    } else if (props.allowHalf) {
      width = `calc(50% - 3px)`
    }

    return {
      width
    }
  })

  const getItemColor = (i: number): string => {
    return i <= currentValue.value
      ? props.activeColor
      : props.inactiveColor
  }

  const getItemStyle = (i: number) => {
    return {
      color: getItemColor(i)
    }
  }

  return {
    decimalIconStyle,
    getItemStyle
  }
}

export const useEvents = (
  props: RatingProp,
  emit: Emitter,
  currentValue: Ref<number>,
  isPointingAtHalf: Ref<boolean>,
  hoverIndex: Ref<number>
) => {
  const handleMouseMove = (val: number, event: MouseEvent) => {
    // display a overview value based on cursor position
    if (props.disabled) return
    if (props.allowHalf) {
      let target = event.target as HTMLElement

      while (!target.classList.contains('sui-rate__item')) {
        target = target.parentNode as HTMLElement
      }

      isPointingAtHalf.value = event.offsetX * 2 <= target.clientWidth
      currentValue.value = isPointingAtHalf.value ? val - 0.5 : val
    } else {
      currentValue.value = val
    }

    hoverIndex.value = val
  }

  const handleMouseLeave = () => {
    // reset to the actual value
    if (props.disabled) return
    if (props.allowHalf) {
      isPointingAtHalf.value = props.modelValue !== Math.floor(props.modelValue)
    }
    currentValue.value = props.modelValue
    hoverIndex.value = -1
  }

  const handleClick = (val: number) => {
    // actually change the modelValue
    if (props.disabled) return
    if (props.allowHalf && isPointingAtHalf.value) {
      emit('update:modelValue', currentValue.value)
      emit('change', currentValue.value)
    } else {
      emit('update:modelValue', val)
      emit('change', val)
    }
  }

  return {
    handleClick,
    handleMouseLeave,
    handleMouseMove
  }
}