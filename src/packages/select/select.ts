import { OptionModel } from 'salmon-ui/select-option/option'

import {
  PropType,
  ExtractPropTypes,
  Component,
  SetupContext,
  StyleValue,
  ref,
  watch,
  onMounted,
  provide,
  computed,
  nextTick
} from 'vue'

import tippy, {
  Instance,
  Props
} from 'tippy.js'

import {
  CustomProps,
  convertTrigger,
  baseConfig
} from '@/utils/popper'

import { IOptionProxy } from 'salmon-ui/select-option/option'

import { throttle } from 'lodash'

type SelectProps = ExtractPropTypes<typeof props>

export const props = {
  modelValue: [
    String, Boolean, Number, Object, Array
  ] as PropType<OptionModel | OptionModel[]>,
  placeholder: String,
  disabled: Boolean,
  multiple: Boolean,
  filterable: Boolean,
  limit: Number,
  prefixIcon: Object as PropType<Component>,
  allowCreate: Boolean,
  tagLimit: {
    type: Number,
    default: 1
  }
}

const opts: Partial<Props & CustomProps> = {
  ...baseConfig,
  hideOnClick: true,
  trigger: convertTrigger('click'),
  theme: 'light',
  classes: ['sui-popper', 'sui-popper--select'],
  sticky: true,
}

const expandCls = 'is-expanded'

export const useSelect = (
  props: SelectProps,
  emit: SetupContext<('update:modelValue' | 'change')[]>['emit']
) => {
  const options = ref<Map<OptionModel, IOptionProxy>>(new Map())

  const noOption = computed(() => {
    if (!props.filterable) return false

    let flag = true
    options.value.forEach(e => {
      if (!e.isHidden) {
        flag = false
      }
    })

    return flag
  })

  const highlighted = ref<IOptionProxy>()
  const selected = ref<OptionModel | OptionModel[]>(props.modelValue || [])

  const inputModel = ref('')
  const tagsModel = ref<string[]>([])
  const inputPlaceholder = ref('')
  const isComposing = ref(false)

  const referenceEl = ref<HTMLElement>()
  const popperEl = ref<HTMLElement>()
  const tagsEl = ref<HTMLElement>()
  const filterInputEl = ref<HTMLInputElement>()
  const popperInstance = ref<Instance>()

  const displayedLabel = computed(() => (
    props.multiple ? '' : inputModel.value
  ))

  const menuWidth = computed(() => {
    if (referenceEl.value) {
      return window.getComputedStyle(referenceEl.value)['width']
    }

    return '0'
  })

  const filterInputStyle = computed<StyleValue>(() => {
    return tagsEl.value
      ? { marginLeft: window.getComputedStyle(tagsEl.value)['width'] }
      : {}
  })

  const onOptionCreate = (proxy: IOptionProxy) => {
    options.value.set(proxy.value, proxy)
    nextTick(() => {
      setLabel()
    })
  }

  const onOptionClick = (proxy: IOptionProxy) => {
    if (props.multiple) {
      const index = (selected.value as OptionModel[]).indexOf(
        proxy.uniqueId || proxy.value
      )

      if (index > -1) {
        (selected.value as OptionModel[]).splice(index, 1)
      } else {
        (selected.value as OptionModel[]).push(proxy.uniqueId || proxy.value)
      }

      if (props.filterable) {
        inputModel.value = ''
        resetOptionVisibility()
        filterInputEl.value?.focus()
        console.log(filterInputEl.value)
      }
    } else {
      if (typeof proxy.value === 'object') {
        selected.value = proxy.uniqueId as string
      } else {
        selected.value = proxy.value
      }
    }

    emit('update:modelValue', selected.value)
    if (!props.multiple) {
      popperInstance.value?.hide()
    }
  }

  const setLabel = () => {
    if (props.multiple) {
      const val = selected.value as OptionModel[]
      tagsModel.value = []
      for (let i = 0; i < Math.min(props.tagLimit, val.length); i++) {
        tagsModel.value.push(options.value.get(val[i])?.renderedLabel || '')
      }
    } else {
      const val = selected.value
      inputModel.value = options.value.get(val as OptionModel)?.renderedLabel as string
    }
  }

  const handleTagClose = (i: number) => {
    (selected.value as OptionModel[]).splice(i, 1)
    if (props.multiple && props.filterable) {
      filterInputEl.value?.focus()
    }
  }
  const handleInputFocus = () => {
    // 
  }
  const handleComposition = (s: 'start' | 'end') => {
    isComposing.value = s === 'start'
  }

  const onInput = throttle(() => {
    if (isComposing.value) return

    options.value.forEach(option => {
      if (!option.renderedLabel.includes(inputModel.value)) {
        option.isHidden = true
      } else {
        option.isHidden = false
      }
    })
  }, 50)

  const resetOptionVisibility = () => {
    options.value.forEach(option => {
      option.isHidden = false
    })
  }

  const onInputFocus = () => {
    if (!props.filterable) return

    if (props.multiple) {
      popperInstance.value?.show()
    } else {
      inputPlaceholder.value = inputModel.value
      inputModel.value = ''
      resetOptionVisibility()  
    }
  }

  const onInputBlur = () => {
    // TODO: for now we do nothing
  }
  
  const validateInputModel = () => {
    const labels = [...options.value.values()].map((option) => option.renderedLabel)
    for (let i = 0; i < labels.length; i++) {
      if (inputModel.value === labels[i]) {
        return true
      }
    }

    return false
  }

  const onPopperShow = () => {
    referenceEl.value?.classList.add(expandCls)
  }
  const onPopperHide = () => {
    referenceEl.value?.classList.remove(expandCls)
    if (props.filterable) {
      if (props.multiple) {
        // 
      } else {
        setLabel()
        if (!validateInputModel()) {
          resetOptionVisibility()
        }
      }
    }
  }

  provide('select', {
    props,
    selected,
    onOptionClick,
    onOptionCreate
  })

  onMounted(() => {
    // create popper
    popperInstance.value = tippy(referenceEl.value as Element, {
      ...opts,
      content: popperEl.value,
      onShow: onPopperShow,
      onHide: onPopperHide
    })

    if (props.disabled) {
      popperInstance.value.disable()
    }

    setLabel()
  })

  watch(() => props.disabled, (val) => {
    if (val) {
      popperInstance.value?.disable()
    } else {
      popperInstance.value?.enable()
    }
  })

  watch(() => props.modelValue, () => {
    if (props.modelValue !== undefined) {
      selected.value = props.modelValue
    }
    setLabel()
  }, { deep: true })

  return {
    options,
    menuWidth,
    selected,
    displayedLabel,
    inputModel,
    tagsModel,
    inputPlaceholder,
    isComposing,
    onInput,
    onInputFocus,
    onInputBlur,
    noOption,
    referenceEl,
    popperEl,
    filterInputEl,
    handleTagClose,
    handleInputFocus,
    handleComposition,
    filterInputStyle
  }
}