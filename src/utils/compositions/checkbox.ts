import {
  ref,
  computed,
  inject,
  nextTick,
} from 'vue'

import error from '@/utils/class.error'

type CheckboxModel = string | number | boolean | string[] | number[]
type CheckboxSize = '' | 'small' | 'large'
interface ICheckboxProvider {
  name: string,
  disabled?: boolean,
  group: string,
  size?: CheckboxSize,
  changeEvent: (v: CheckboxModel) => void,
  min?: number,
  max?: number,
  modelValue: CheckboxModel
}

const useCheckbox = (props, emit) => {
  // injected
  const checkboxGroup = inject('checkboxGroup', {} as ICheckboxProvider)

  const isGroup = computed(() =>
    checkboxGroup.group === 'checkboxGroup'
  )

  if (!isGroup.value && props.modelValue === undefined) {
    error(
      'sui-checkbox',
      'Checkbox(and checkbox-button) should either be used with `v-model` or in a checkbox-group'
    )
  }

  // data
  const selfModel = ref<CheckboxModel>(false)
  const exceedLimit = ref(false)

  // computed
  const storedModel = computed(() =>
    isGroup.value ? checkboxGroup.modelValue : props.modelValue
  )

  const computedName = computed(() => {
    return isGroup.value ? checkboxGroup.name : props.name
  })

  const size = computed(() =>
    isGroup.value ? checkboxGroup.size : null
  )

  const model = computed({
    get() {
      return isGroup.value ? storedModel.value : (props.modelValue ?? selfModel)
    },
    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        exceedLimit.value = false

        if(checkboxGroup.min && val.length < checkboxGroup.min) {
          exceedLimit.value = true
        }
        if(checkboxGroup.max && val.length > checkboxGroup.max) {
          exceedLimit.value = true
        }

        exceedLimit.value === false && checkboxGroup.changeEvent(val)
      } else {
        console.log('logged', val)
        emit('update:modelValue', val)
        selfModel.value = val as any
      }
    }
  })

  const isChecked = computed<CheckboxModel>(() => {
    const value = model.value

    if (typeof value === 'boolean') {
      return value
    } else if (Array.isArray(value)) {
      return (value as any).includes(props.value)
    } else if (value !== null && value !== undefined) {
      return value === props.checkedValue
    }

    return false
  })

  const disabledForExceedLimit = computed(() => {
    const max = checkboxGroup.max
    const min = checkboxGroup.min

    if (!max && !min) return false

    if (min && model.value.length <= min && isChecked.value) {
      return true
    }
    if (max && model.value.length >= max && !isChecked.value) {
      return true
    }

    return false
  })

  const isDisabled = computed(() => {
    if(isGroup.value) {
      return checkboxGroup.disabled || props.disabled || disabledForExceedLimit.value
    } else {
      return props.disabled
    }
  })

  // methods
  const handleChange = (evt: InputEvent) => {
    if(exceedLimit.value) return
    const target = evt.target as HTMLInputElement
    const value = target.checked ? (props.checkedValue ?? true) : (props.uncheckedValue ?? false)

    nextTick(() => {
      emit('change', value)
    })
  }

  return {
    isChecked,
    isDisabled,
    isGroup,
    computedName,
    size,

    model,
    handleChange
  }
}

export default useCheckbox
