import { buildProp } from '@/utils/props'
import {
  ExtractPropTypes,
  SetupContext,
  computed,
  reactive,
  PropType,
  toRefs,
  ComponentInternalInstance,
  Component
} from 'vue'

export const props = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  type: buildProp({
    values: ['text', 'password'],
    default: 'text'
  } as const),
  size: buildProp({
    values: ['large', 'small']
  }),
  disabled: Boolean,
  readonly: Boolean,
  showPasswordToggler: Boolean,
  clearable: Boolean,
  showWordCounter: Boolean,
  autoComplete: Boolean,
  tabIndex: String,
  label: String,
  placeholder: String,
  inputClass: String,
  prefixIcon: Object as PropType<Component>,
  suffixIcon: Object as PropType<Component>
}

export const emits = [
  'update:modelValue', 'change', 'focus', 'blur', 'input',
  'keydown', 'clear', 'composition:start', 'composition:end'
]

export const emitTypes = [
  'update:modelValue', 'change', 'focus', 'blur', 'input',
  'keydown', 'clear', 'composition:start', 'composition:end'
] as const

export type EmitTypes = typeof emitTypes[number]

type InputProps = ExtractPropTypes<typeof props>
type States = ReturnType<typeof useStates>

export const useStates = (
  props: InputProps,
  ctx: SetupContext<EmitTypes[]>
) => {
  const states = reactive({
    isHovering: false,
    isFocused: false,
    isComposing: false,
    isPasswordVisible: false
  })

  const maxLength = computed(() => ctx.attrs.maxlength)

  const textLength = computed(() => {
    if (typeof props.modelValue === 'number') {
      return String(props.modelValue).length
    }

    return props.modelValue?.length || 0
  })

  const inputValue = computed(() =>
    props.modelValue
      ? String(props.modelValue)
      : ''
  )

  return {
    ...toRefs(states),
    maxLength,
    textLength,
    inputValue
  }
}

export const useAffixes = (
  props: InputProps,
  ctx: SetupContext<EmitTypes[]>,
  states: States
) => {
  const showWordCounter = computed(() =>
    ctx.attrs.maxlength &&
    props.showWordCounter &&
    (
      !props.disabled &&
      !props.readonly &&
      !props.showPasswordToggler
    )
  )

  const showPasswordToggler = computed(() =>
    props.showPasswordToggler &&
    props.type === 'password' &&
    states.textLength.value > 0
  )

  const showClearIcon = computed(() =>
    props.clearable &&
    (states.isHovering || states.isFocused) &&
    states.textLength.value > 0
  )

  const hasSuffix = computed(() =>
    props.showWordCounter ||
    props.showPasswordToggler ||
    props.clearable ||
    ctx.slots.suffix ||
    props.suffixIcon
  )

  return {
    showClearIcon,
    showPasswordToggler,
    showWordCounter,
    hasSuffix
  }
}

export const useActions = (
  props: InputProps,
  ctx: SetupContext<EmitTypes[]>,
  states: States
) => {
  const togglePassword = () => {
    states.isPasswordVisible.value = !states.isPasswordVisible.value
  }

  const clearInput = () => {
    ctx.emit('update:modelValue', '')
    ctx.emit('change', '')
    ctx.emit('clear')
  }

  return {
    togglePassword,
    clearInput
  }
}

export const useEvents = (
  emit: SetupContext<EmitTypes[]>['emit'],
  states: States
) => {
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', target.value)
    emit('input', target.value)
  }

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('change', target.value)
  }

  const handleCompositionStart = () => {
    states.isComposing.value = true
    emit('composition:start')
  }

  const handleCompositionEnd = () => {
    states.isComposing.value = false
    emit('composition:end')
  }

  const handleMouseEnter = () => {
    states.isHovering.value = true
  }

  const handleMouseLeave = () => {
    states.isHovering.value = false
  }

  const handleFocus = (event: Event) => {
    states.isFocused.value = true
    emit('focus', event)
  }

  const handleBlur = (event: Event) => {
    states.isFocused.value = false
    emit('blur', event)
  }

  const handleKeyDown = (event: Event) => {
    emit('keydown', event)
  }

  return {
    handleBlur,
    handleChange,
    handleCompositionEnd,
    handleCompositionStart,
    handleFocus,
    handleInput,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave
  }
}

export const useIconPosition = (
  ctx: SetupContext<EmitTypes[]>,
  instance: ComponentInternalInstance
) => {
  const pendantMap = {
    suffix: 'append',
    prefix: 'prepend',
  }
  
  const getIconOffset = (place: 'prefix' | 'suffix') => {
    const { el } = instance.vnode
    if (!el) return

    const elList: HTMLSpanElement[] = Array.from(
      el.querySelectorAll(`.sui-input__${place}`)
    )
    const target = elList.find(item => item.parentNode === el)
    if (!target) return

    const pendant = pendantMap[place]
    if (ctx.slots[pendant]) {
      target.style.transform = `
          translateX(
            ${place === 'suffix'? '-' : ''}
            ${el.querySelector(`.sui-input__${pendant}`).offsetWidth}
          px)
        `
    } else {
      target.removeAttribute('style')
    }
  }

  const updateIconOffset = () => {
    getIconOffset('prefix')
    getIconOffset('suffix')
  }

  return {
    updateIconOffset
  }
}
