import props from './props'
import radioGroupProps from '@/packages/radio-group/props'

import {
  ExtractPropTypes,
  inject,
  computed,
  SetupContext,
  nextTick
} from 'vue'

import throwError from '@/utils/class.error'

type RadioProps = ExtractPropTypes<typeof props>
type RadioGroupContext = ExtractPropTypes<typeof radioGroupProps> & {
  changeEvent: (v: string | number) => void,
  groupId: 'radioGroup'
} | undefined
type Model = string | number

export const useRadio = (
  props: RadioProps,
  emit: SetupContext<('update:modelValue' | 'change')[]>['emit']
) => {
  const radioGroup: RadioGroupContext = inject(
    'radioGroupContext',
    undefined as RadioGroupContext
  )

  if (radioGroup && props.modelValue === undefined) {
    throwError(
      'sui-radio',
      'radio component should either be used with `v-model` or in a radio-group'
    )
  }

  const computedName = computed(() => radioGroup?.name || props.name)
  const isDisabled = computed(() => radioGroup?.disabled || props.disabled)
  
  const model = computed<Model>({
    get () {
      return (radioGroup?.modelValue || props.modelValue) as Model
    },
    set (val: Model) {
      if (radioGroup) {
        radioGroup.changeEvent(val)
      } else {
        emit('update:modelValue', val)
      }
    }
  })

  const handleChange = () => {
    nextTick().then(() => {
      emit('change', model.value)
    })
  }

  return {
    model,
    computedName,
    isDisabled,
    handleChange
  }
}