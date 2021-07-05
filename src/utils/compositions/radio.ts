import {
  computed,
  inject,
  nextTick
} from 'vue'

type RadioModel = string | number | boolean
type RadioSize = '' | 'small' | 'large'
interface IRadioGroupProvider {
  name: string,
  modelValue: RadioModel,
  disabled: boolean,
  group: boolean,
  changeEvent: (v: RadioModel) => void,
  size?: RadioSize,
}

import throwError from '@/utils/class.error'

const useRadio = (props, emit) => {
  // injected
  const radioGroup = inject('radioGroup', {} as IRadioGroupProvider)

  // computed
  const isGroup = computed(() => {
    return radioGroup.group
  })

  const computedName = computed(() => {
    if (isGroup.value) {
      return radioGroup.name
    } else {
      return props.name
    }
  })

  // throw an error if v-model is omitted and is not in a group
  if (!isGroup.value && props.modelValue === undefined) {
    throwError(
      'sui-radio',
      'Radio should either be used with `v-model` or in a radio-group'
    )
  }

  const isDisabled = computed(() => {
    if(isGroup.value) {
      return radioGroup.disabled || props.disabled
    } else {
      return props.disabled
    }
  })

  const model = computed<RadioModel>({
    get() {
      return isGroup.value ? radioGroup.modelValue : props.modelValue as RadioModel
    },
    set(val: RadioModel) {
      if(isGroup.value) {
        radioGroup.changeEvent(val)
      } else {
        emit('update:modelValue', val)
      }
    }
  })

  const buttonSize = computed(() => {
    return radioGroup.size
  })

  const handleChange = () => {
    nextTick().then(() => {
      emit('change', model.value)
    })
  }

  return {
    isGroup,
    isDisabled,
    model,
    radioGroup,
    computedName,
    buttonSize,

    handleChange
  }
}

export default useRadio
