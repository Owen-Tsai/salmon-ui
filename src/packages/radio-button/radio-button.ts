import {
  props as radioProps,
  useRadio
} from 'salmon-ui/radio/radio'
import {
  ExtractPropTypes,
  SetupContext,
  computed
} from 'vue'

export const props = {
  ...radioProps
}

export type RadioButtonProps = ExtractPropTypes<typeof props>

export const useRadioButton = (
  props: RadioButtonProps,
  emit: SetupContext<('update:modelValue' | 'change')[]>['emit']
) => {
  const {
    computedName,
    handleChange,
    isDisabled,
    isGroup,
    model,
    size
  } = useRadio(props, emit)

  const tabIndex = computed(() => {
    return (
      isDisabled.value ||
      (isGroup.value && model.value !== props.value)
    ) ? -1 : 0
  })

  return {
    computedName,
    handleChange,
    isDisabled,
    model,
    size,
    tabIndex
  }
}