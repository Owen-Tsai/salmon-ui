import {
  inject,
  computed,
  SetupContext,
  nextTick
} from 'vue'

import error from '@/utils/class.error'

import type { RadioProps, Model } from './radio'
import type { RadioButtonProps } from '@/packages/radio-button/radio-button'
import type { RadioGroupContext } from '@/packages/radio-group/radio-group'

export const useRadio = (
  props: RadioProps | RadioButtonProps,
  emit: SetupContext<('update:modelValue' | 'change')[]>['emit']
) => {
  const radioGroup: RadioGroupContext = inject(
    'radioGroupContext',
    undefined as RadioGroupContext
  )

  const isGroup = computed(() => radioGroup?.group === 'radio-group')

  if (isGroup.value && props.modelValue === undefined) {
    error(
      'sui-radio',
      'radio component should either be used with `v-model` or in a radio-group'
    )
  }

  const computedName = computed(() => isGroup.value ? radioGroup!.name : props.name)
  const isDisabled = computed(() => isGroup.value 
    ? radioGroup!.disabled || props.disabled 
    : props.disabled
  )

  console.log(computedName.value, isDisabled.value, isGroup.value)
  
  const model = computed<Model>({
    get () {
      return (isGroup.value
        ? radioGroup!.modelValue
        : props.modelValue
      ) as Model
    },
    set (val: Model) {
      if (isGroup.value) {
        radioGroup!.changeEvent(val)
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

  const size = computed(() => radioGroup?.size)

  return {
    model,
    size,
    computedName,
    isDisabled,
    handleChange,
    isGroup
  }
}