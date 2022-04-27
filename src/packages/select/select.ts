import {
  OptionModel,
  Option
} from 'salmon-ui/select-option/option'

import {
  PropType,
  ExtractPropTypes,
  Component,
  SetupContext,
  ref,
  watch,
  onMounted,
  getCurrentInstance,
  ComponentInternalInstance,
  provide,
  reactive,
  VNode
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

import {
  IOptionProxy
} from 'salmon-ui/select-option/option'

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
  trigger: convertTrigger('focus'),
  theme: 'light',
  classes: ['sui-popper', 'sui-popper--select'],
  sticky: true,
}

export const useSelect = (
  props: SelectProps,
  emit: SetupContext<('update:modelValue' | 'change')[]>['emit']
) => {
  const referenceEl = ref<HTMLElement>()
  const popperEl = ref<HTMLElement>()
  const popperInstance = ref<Instance>()

  const options = ref<Map<OptionModel, IOptionProxy>>(new Map())
  const cachedOptions = ref<Map<OptionModel, IOptionProxy>>(new Map())

  const selected = ref<OptionModel | OptionModel[]>([])

  const instance = getCurrentInstance()

  const onOptionCreate = (proxy: IOptionProxy) => {
    options.value.set(proxy.value, proxy)
    if (props.allowCreate) {
      cachedOptions.value.set(proxy.value, proxy)
    }
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
  }

  const setLabel = () => {
    
  }

  onMounted(() => {
    // create popper
    popperInstance.value = tippy(referenceEl.value as Element, {
      ...baseConfig,
      ...opts,
      content: popperEl.value
    })
  })

}