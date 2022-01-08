import {
  inject,
  computed,
  ref,
  getCurrentInstance,
  nextTick,
  ComputedRef
} from 'vue'

import error from '@/utils/class.error'

import type {
  CheckboxGroupProps
} from '@/packages/checkbox-group/checkbox-group' 
import type { CheckboxProps } from './checkbox'
import type { PartialReturnType } from '@/utils/types'

type CheckboxGroupContext = CheckboxGroupProps & {
  group: 'checkbox-group',
  changeEvent: (e: unknown) => void
} | undefined

const useGroup = () => {
  const checkboxGroup: CheckboxGroupContext = inject(
    'checkboxGroup',
    undefined as CheckboxGroupContext
  )

  const isGroup = computed(() => checkboxGroup?.group === 'checkbox-group')

  return {
    checkboxGroup,
    isGroup
  }
}

const useModel = (props: CheckboxProps) => {
  const {
    isGroup,
    checkboxGroup
  } = useGroup()

  const { emit } = getCurrentInstance()!

  const selfModel = ref(false)
  const exceedLimit = ref(false)

  const storedModel = computed(() =>
    isGroup.value ? checkboxGroup!.modelValue : props.modelValue
  )
  const model = computed({
    get() {
      return isGroup.value
        ? storedModel.value
        : (props.modelValue ?? selfModel.value)
    },
    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        exceedLimit.value = false

        if(checkboxGroup!.min && val.length < checkboxGroup!.min) {
          exceedLimit.value = true
        }
        if(checkboxGroup!.max && val.length > checkboxGroup!.max) {
          exceedLimit.value = true
        }

        exceedLimit.value === false && checkboxGroup!.changeEvent(val)
      } else {
        emit('update:modelValue', val)
        selfModel.value = val as any
      }
    }
  })

  return {
    model,
    exceedLimit
  }
}

const useStates = (
  props: CheckboxProps,
  { model }: PartialReturnType<typeof useModel>
) => {
  const {
    isGroup,
    checkboxGroup
  } = useGroup()

  const focus = ref(false)

  const disabledForExceedingLimit = computed(() => {    
    const max = checkboxGroup?.max
    const min = checkboxGroup?.min

    if (!max && !min) return false

    if (min && (model as any).value.length <= min && isChecked.value) {
      return true
    }
    if (max && (model as any).value.length >= max && !isChecked.value) {
      return true
    }

    return false
  })
  const isDisabled = computed(() => {
    if(isGroup.value) {
      return checkboxGroup!.disabled
        || props.disabled
        || disabledForExceedingLimit.value
    } else {
      return props.disabled
    }
  })
  const isChecked = computed(() => {
    const value = model!.value

    if (typeof value === 'boolean') {
      return value
    } else if (Array.isArray(value)) {
      return (value as any).includes(props.value)
    } else if (value !== null && value !== undefined) {
      return value === props.checkedValue
    }

    return false
  })

  return {
    focus,
    isDisabled,
    isChecked
  }
}

const useProps = (
  props: CheckboxProps
) => {
  const {
    isGroup,
    checkboxGroup
  } = useGroup()

  const computedName = computed(() => 
    isGroup.value ? checkboxGroup!.name : props.name
  )

  const size = computed(() =>
    isGroup.value ? checkboxGroup!.size : null
  )

  return {
    computedName,
    size,
  }
}

export const useCheckbox = (
  props: CheckboxProps,
) => {
  const { emit } = getCurrentInstance()!

  const { isGroup } = useGroup()

  const {
    model,
    exceedLimit
  } = useModel(props)

  const {
    isChecked,
    isDisabled,
    focus
  } = useStates(props, { model })

  const {
    computedName,
    size
  } = useProps(props)

  if (!isGroup.value && props.modelValue === undefined) {
    error(
      'sui-checkbox',
      'Checkbox(and checkbox-button) should either be used with `v-model` or in a checkbox-group'
    )
  }

  const handleChange = (evt: Event) => {
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
    focus,
    model,
    handleChange
  }
}