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
  allowCreate: Boolean
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
    let flag = true
    options.value.forEach(e => {
      if (!e.isHidden) {
        flag = false
      }
    })

    return flag
  })

  const highlighted = ref<IOptionProxy>()
  const selected = ref<OptionModel | OptionModel[]>([])

  const label = ref('')

  const inputModel = ref('')
  const inputPlaceholder = ref('')
  const isComposing = ref(false)

  const referenceEl = ref<HTMLElement>()
  const popperEl = ref<HTMLElement>()
  const tagsEl = ref<HTMLElement>()
  const popperInstance = ref<Instance>()

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
      label.value = options.value.get(val[0])?.renderedLabel || ''
    } else {
      const val = selected.value
      label.value = options.value.get(val as OptionModel)?.renderedLabel as string

      if (props.filterable) {
        inputModel.value = label.value
        inputPlaceholder.value = label.value
      }
    }

  }

  const handleTagClose = () => {
    (selected.value as OptionModel[]).shift()
  }
  const handleInputFocus = () => {
    inputModel.value = ''
  }
  const handleComposition = (s: 'start' | 'end') => {
    isComposing.value = s === 'start'
  }

  const onInput = throttle(() => {
    if (isComposing.value) return

    options.value.forEach(option => {
      if (!option.renderedLabel.includes(label.value)) {
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
    if (props.filterable) {
      inputPlaceholder.value = label.value
      label.value = ''
    }
  }

  const onInputBlur = () => {
    if (!validateInputModel()) {
      setLabel()
      resetOptionVisibility()
    }
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
        inputModel.value = ''
      } else {
        inputModel.value = label.value
      }
    }
  }

  provide('select', {
    props,
    isComposing: isComposing.value,
    selected: selected.value,
    inputModel: inputModel.value,
    onOptionClick,
    onOptionCreate
  })

  onMounted(() => {
    console.log(popperEl.value, referenceEl.value)
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
    setLabel()
  })

  return {
    options,
    menuWidth,
    selected,
    label,
    inputModel,
    inputPlaceholder,
    isComposing,
    onInput,
    onInputFocus,
    onInputBlur,
    noOption,
    referenceEl,
    popperEl,
    handleTagClose,
    handleInputFocus,
    handleComposition,
    filterInputStyle
  }
}