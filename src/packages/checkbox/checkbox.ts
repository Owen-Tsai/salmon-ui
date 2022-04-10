import { buildProp } from '@/utils/props'
import {
  ExtractPropTypes,
  PropType,
  SetupContext,
  inject,
  computed,
  ref,
  nextTick
} from 'vue'
import {
  CheckboxGroupProps
} from 'salmon-ui/checkbox-group/checkbox-group'

import error from '@/utils/class.error'

export type Model = string | number| boolean | Record<string | number | symbol, unknown>

export const props = {
  modelValue: [String, Number, Boolean, Array] as PropType<Model | Model[]>,
  value: buildProp({
    type: [String, Number, Boolean],
    default: ''
  } as const),
  checkedValue: [String, Number],
  uncheckedValue: [String, Number],
  indeterminate: Boolean,
  disabled: Boolean,
  name: String
}

export type CheckboxProps = ExtractPropTypes<typeof props>

type CheckboxGroupContext = CheckboxGroupProps & {
  group: 'checkbox-group',
  changeEvent: (e: unknown) => void
} | undefined

const emitTypes = ['update:modelValue', 'change'] as const

type EmitType = typeof emitTypes[number]

export const useGroup = () => {
  const groupContext: CheckboxGroupContext = inject(
    'checkboxGroupContext',
    undefined as CheckboxGroupContext
  )

  const isGroup = computed(() =>
    groupContext && groupContext.group === 'checkbox-group'
  )

  return {
    groupContext,
    isGroup
  }
}

export const useModel = (
  props: CheckboxProps,
  emit: SetupContext<EmitType[]>['emit']
) => {
  const {
    isGroup,
    groupContext
  } = useGroup()

  const selfModel = ref(false)
  const exceedLimit = ref(false)

  const storedModel = computed(() =>
    isGroup.value ? groupContext?.modelValue : props.modelValue
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

        if(groupContext?.min && val.length < groupContext?.min) {
          exceedLimit.value = true
        }
        if(groupContext?.max && val.length > groupContext?.max) {
          exceedLimit.value = true
        }

        exceedLimit.value === false && groupContext?.changeEvent(val)
      } else {
        emit('update:modelValue', val)
        selfModel.value = val as boolean
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
  model: ReturnType<typeof useModel>['model']
) => {
  const {
    isGroup,
    groupContext
  } = useGroup()

  const focus = ref(false)

  const disabledForExceededLimit = computed(() => {    
    const max = groupContext?.max
    const min = groupContext?.min

    if (!max && !min) return false

    if (Array.isArray(model.value)) {
      if (min && model.value.length <= min && isChecked.value) {
        return true
      }
      if (max && model.value.length >= max && !isChecked.value) {
        return true
      }
    }

    return false
  })

  const isDisabled = computed(() => {
    if(isGroup.value) {
      return groupContext?.disabled
        || props.disabled
        || disabledForExceededLimit.value
    } else {
      return props.disabled
    }
  })

  const isChecked = computed(() => {
    const value = model.value

    if (typeof value === 'boolean') {
      return value
    } else if (Array.isArray(value)) {
      return value.includes(props.value)
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
    groupContext
  } = useGroup()

  const computedName = computed(() => 
    isGroup.value ? groupContext?.name : props.name
  )

  const size = computed(() =>
    isGroup.value ? groupContext?.size : null
  )

  return {
    computedName,
    size,
  }
}

export const useCheckbox = (
  props: CheckboxProps,
  emit: SetupContext<EmitType[]>['emit']
) => {
  const { isGroup } = useGroup()

  const {
    model,
    exceedLimit
  } = useModel(props, emit)

  const {
    isChecked,
    isDisabled,
    focus
  } = useStates(props, model)

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