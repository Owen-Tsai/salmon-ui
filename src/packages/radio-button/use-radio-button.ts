import { useRadio } from '@/packages/radio/use-radio'
import { computed } from 'vue'
import error from '@/utils/class.error'

import type {
  RadioButtonProps
} from './radio-button'

export const useRadioButton = (props: RadioButtonProps, emit) => {
  const {
    isDisabled,
    model,
    handleChange,
    computedName,
    isGroup,
    size
  } = useRadio(props, emit)

  const tabindex = computed(() => {
    return (
      isDisabled.value ||
      (isGroup.value && model.value !== props.value)
    ) ? -1 : 0
  })

  return {
    isDisabled,
    model,
    handleChange,
    computedName,
    tabindex,
    size
  }
}