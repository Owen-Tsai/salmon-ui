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
  computed,
  onMounted
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

export const useDropdown = (
  props: DropdownProps,
  emit: SetupContext<EmitEvents[]>['emit'],
) => {
  const popperInstance = ref<Instance>()
  const popperEl = ref<HTMLElement>()
  const referenceEl = ref<HTMLElement>()
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

  const navigateMenuItem = (key: 'up' | 'down', index?: number) => {
    const idx = index || items.value.findIndex(e => e === highlighted.value)

    if (key === 'up') {
      if (idx <= 0) {
        if (!highlighted.value) {
          setHighlightedItem(items.value[items.value.length - 1])
        }

        return
      }
      if (items.value[idx - 1].disabled) {
        navigateMenuItem('up', idx - 1)
      } else {
        setHighlightedItem(items.value[idx - 1])
      }
    } else {
      if (idx >= items.value.length - 1) return
      if (items.value[idx + 1].disabled) {
        navigateMenuItem('down', idx + 1)
      } else {
        setHighlightedItem(items.value[idx + 1])
      }
    }
  }

  const clearHighlightState = () => {
    resetItemHighlight()
    highlighted.value = undefined
  }

  const selectItem = () => {
    if (highlighted.value) {
      highlighted.value.handleClick()
    }
  }

  const closeMenu = () => {
    popperInstance.value?.hide()
  }

  const handleMenuHide = (instance: Instance) => {
    emit('before-hide', instance)
    clearHighlightState()
  }

  const { computedStyle } = useStyles(props)

  onMounted(() => {
    const option: Partial<CustomProps & Props> = {
      trigger: convertTrigger(props.trigger),
      hideOnClick: true,
      theme: 'light',
      classes: [
        'sui-popper', 'sui-popper--dropdown'
      ],
      content: popperEl.value,
      onShow: (instance) => {
        emit('before-show', instance)
      },
      onHide: (instance) => {
        handleMenuHide(instance)
      },
      onHidden: (instance) => {
        emit('after-hide', instance)
      },
      onShown: (instance) => {
        emit('after-show', instance)
      }
    }

    popperInstance.value = tippy(referenceEl.value as HTMLElement, {
      ...baseConfig,
      ...option
    })

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
  })

  return {
    computedStyle,
    clearHighlightState,
    onItemCreated,
    setHighlightedItem,
    navigateMenuItem,
    selectItem,
    closeMenu,

    referenceEl,
    popperEl,
    popperInstance
  }
}
