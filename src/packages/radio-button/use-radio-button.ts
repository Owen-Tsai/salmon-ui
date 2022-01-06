import { useRadio } from '@/packages/radio/use-radio'
import props from './props'

import {
  ExtractPropTypes,
  computed
} from 'vue'

import throwError from '@/utils/class.error'

type RadioButtonProps = ExtractPropTypes<typeof props>

export const useRadioButton = (props: RadioButtonProps, emit) => {
  const {
    isDisabled,
    model,
    handleChange,
    computedName,
    radioGroup
  } = useRadio(props, emit)

  if (radioGroup === undefined) {
    throwError(
      'sui-radio-button',
      '`radio-button`(s) must be used inside a `radio-group` component'
    )
  }

  const tabindex = computed(() => {
    return (
      isDisabled.value ||
      (radioGroup !== undefined && model.value !== props.value)
    ) ? -1 : 0
  })

  const size = computed(() => radioGroup?.size || props.size)

  return {
    isDisabled,
    model,
    handleChange,
    computedName,
    tabindex,
    size
  }
}