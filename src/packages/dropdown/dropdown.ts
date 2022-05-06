import { buildProp } from '@/utils/props'
import tippy, { Instance, Props } from 'tippy.js'
import {
  CustomProps,
  convertTrigger,
  baseConfig
} from '@/utils/popper'
import {
  SetupContext,
  ExtractPropTypes,
  ref,
  watch,
  watchEffect,
  computed
} from 'vue'
import { ItemProxy } from 'salmon-ui/dropdown-item/dropdown-item'

type DropdownProps = ExtractPropTypes<typeof props>
type EmitEvents = 'before-hide' | 'after-hide' | 'before-show' | 'after-show'

export const props = {
  splitButton: Boolean,
  placement: buildProp({
    type: String,
    values: [
      'top-start', 'top', 'top-end',
      'left-start', 'left', 'left-end',
      'right-start', 'right', 'right-end',
      'bottom-start', 'bottom', 'bottom-end'
    ],
    default: 'bottom-end'
  } as const),
  trigger: buildProp({
    type: String,
    values: ['click', 'hover', 'focus', 'manual'],
    default: 'click'
  } as const),
  disabled: Boolean,
  maxHeight: Number,
  submenu: Boolean
}

export const usePopperOptions = (
  props: DropdownProps
) => {
  const options: Partial<Props & CustomProps> = {
    ...baseConfig,
    trigger: convertTrigger(props.trigger),
    hideOnClick: true,
    theme: 'light',
    classes: [
      'sui-popper', 'sui-popper--dropdown'
    ]
  }

  return {
    options
  }
}

export const usePopperInstance = (
  options: Partial<Props & CustomProps>,
  props: DropdownProps,
  emit: SetupContext<EmitEvents[]>['emit']
) => {
  const popperInstance = ref<Instance | null>(null)
  const isSubmenuExpanded = ref(false)

  const handleMenuHide = (instance: Instance) => {
    emit('before-hide', instance)
    if (props.submenu) {
      isSubmenuExpanded.value = false
    }
  }

  const handleMenuShow = (instance: Instance) => {
    emit('before-show', instance)
    if (props.submenu) {
      isSubmenuExpanded.value = true
    }
  }

  const createPopper = (
    referenceEl: HTMLElement,
    popperEl: HTMLElement
  ) => {
    popperInstance.value = tippy(referenceEl, {
      ...options,
      ...{
        content: popperEl,
        onShow: (instance) => {
          handleMenuShow(instance)
          popperEl.focus()
        },
        onHide: (instance) => {
          handleMenuHide(instance)
          popperEl.focus()
        },
        onHidden: (instance) => {
          emit('after-hide', instance)
        },
        onShown: (instance) => {
          emit('after-show', instance)
        }
      } as Partial<Props | CustomProps>
    })
  }

  const setupWatchers = () => {
    watch(() => props.disabled, (val) => {
      if (!popperInstance.value) return
      if (val) {
        popperInstance.value.disable()
      } else {
        popperInstance.value.enable()
      }
    })

    watchEffect(() => {
      if (!popperInstance.value) return
      popperInstance.value.setProps({
        trigger: convertTrigger(props.trigger),
        placement: props.placement
      })
    })
  }

  return {
    createPopper,
    setupWatchers,
    popperInstance,
    isSubmenuExpanded
  }
}

export const useStyles = (props: DropdownProps) => {
  const computedStyle = computed(() => {
    return props.maxHeight ? {
      maxHeight: `${props.maxHeight}px`
    } : {}
  })

  return {
    computedStyle
  }
}

export const useEvents = () => {
  const highlighted = ref<ItemProxy>()
  const items = ref<ItemProxy[]>([])

  const onItemCreated = (proxy: ItemProxy) => {
    items.value.push(proxy)
  }

  const setHighlightedItem = (proxy: ItemProxy) => {
    resetItemHighlight()
    proxy.highlighted = true
    highlighted.value = proxy
  }

  const resetItemHighlight = () => {
    items.value.forEach((item) => {
      item.highlighted = false
    })
  }

  const onKeyDown = (key: 'up' | 'down', index?: number) => {
    const idx = index || items.value.findIndex(e => e === highlighted.value)

    if (key === 'up') {
      if (idx <= 0) return
      if (items.value[idx - 1].disabled) {
        onKeyDown('up', idx - 1)
      } else {
        setHighlightedItem(items.value[idx - 1])
      }
    } else {
      if (idx >= items.value.length - 1) return
      if (items.value[idx + 1].disabled) {
        onKeyDown('down', idx + 1)
      } else {
        setHighlightedItem(items.value[idx + 1])
      }
    }
  }

  const onMouseLeave = () => {
    resetItemHighlight()
    highlighted.value = undefined
  }

  return {
    onItemCreated,
    setHighlightedItem,
    onKeyDown,
    onMouseLeave
  }
}