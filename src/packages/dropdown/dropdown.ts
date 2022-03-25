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
  props: DropdownProps,
  emit: SetupContext<EmitEvents[]>['emit']
) => {
  const isSubmenuExpanded = ref(false)

  const options: Partial<Props & CustomProps> = {
    ...baseConfig,
    trigger: convertTrigger(props.trigger),
    hideOnClick: true,
    theme: 'light',
    classes: [
      'sui-popper', 'sui-popper--dropdown'
    ],
    onHide: (instance) => {
      handleMenuHide(instance)
    },
    onHidden: (instance) => {
      emit('after-hide', instance)
    },
    onShow: (instance) => {
      handleMenuShow(instance)
    },
    onShown: (instance) => {
      emit('after-show', instance)
    }
  }

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

  return {
    options,
    isSubmenuExpanded
  }
}

export const usePopperInstance = (
  options: Partial<Props & CustomProps>,
  props: DropdownProps
) => {
  const popperInstance = ref<Instance | null>(null)

  const createPopper = (
    referenceEl: Element,
    popperEl: Element
  ) => {
    popperInstance.value = tippy(referenceEl, {
      ...options,
      ...{
        content: popperEl
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
    popperInstance
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