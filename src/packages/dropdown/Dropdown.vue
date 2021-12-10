<template>
  <div class="sui-dropdown" v-if="!submenu">
    <div class="sui-dropdown__reference" ref="referenceEl">
      <slot name="reference"></slot>
    </div>
    <div
      class="sui-dropdown__popper"
      ref="popperEl"
      :style="computedStyle"
    >
      <slot></slot>
    </div>
  </div>

  <li
    v-else
    class="sui-dropdown sui-dropdown-menu__item sui-dropdown-submenu"
    ref="referenceEl"
  >
    <div class="sui-dropdown__reference" ref="referenceEl">
      <slot name="reference"></slot>
      <s-icon :class="[
        'submenu-arrow',
        isSubmenuExpanded ? 'rotate--180' : null
      ]">
        <arrow-right-s></arrow-right-s>
      </s-icon>
    </div>
    <div
      class="sui-dropdown__popper"
      ref="popperEl"
      :style="computedStyle"
    >
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts">
  import {
    ref,
    PropType,
    defineComponent,
    provide,
    getCurrentInstance,
    onMounted,
    watch,
    watchEffect,
    computed
  } from 'vue'
  import tippy from 'tippy.js'
  import { Placement } from 'tippy.js'
  import {
    dropdownPopperConfig,
    themeType,
    triggerType
  } from '@/utils/popper-options'

  import SIcon from '../icon'
  import { ArrowRightS } from '@salmon-ui/icons'

  const _placements = [
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end',
    'right-start'
  ]

  export default defineComponent({
    name: 'SDropdown',
    components: {
      SIcon,
      ArrowRightS
    },
    props: {
      type: String,
      splitButton: Boolean,
      placement: {
        type: String as PropType<Placement>,
        default: 'bottom-start',
        validator: (v: string) => {
          return _placements.includes(v)
        }
      },
      trigger: {
        type: String,
        default: 'click'
      },
      hideOnClick: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      maxHeight: Number,
      submenu: Boolean
    },
    setup(props, ctx) {
      let tippyInstance: any = null
      const referenceEl = ref<Element>()
      const popperEl = ref<Element>()
      const instance = getCurrentInstance()
      const isSubmenuExpanded = ref(false)

      const handleMenuHide = (instance) => {
        ctx.emit('before-hide', instance)
        if (props.submenu) {
          isSubmenuExpanded.value = false
        }
      }

      const handleMenuShow = (instance) => {
        ctx.emit('before-show', instance)
        if (props.submenu) {
          isSubmenuExpanded.value = true
        }
      }

      const options = {
        placement: props.placement,
        hideOnClick: props.hideOnClick,
        trigger: triggerType(props.trigger),
        theme: themeType('light'),
        classes: ['sui-popper--dropdown'],
        onHide: (instance) => {
          handleMenuHide(instance)
        },
        onShow: (instance) => {
          handleMenuShow(instance)
        },
        onHidden: (instance) => { ctx.emit('after-hide', instance) },
        onShown: (instance) => { ctx.emit('after-hide', instance) }
      }

      const computedStyle = computed(() => {
        return props.maxHeight ?
          {
            maxHeight: `${props.maxHeight}px`
          } : {}
      })

      onMounted(() => {
        if(referenceEl.value) {
          tippyInstance = tippy(referenceEl.value, {
            ...options, ...dropdownPopperConfig, ...{
              content: popperEl.value
            }
          })
        }

        if(props.disabled) {
          tippyInstance.disable()
        }
      })

      watchEffect(() => {
        if(!tippyInstance) return
        tippyInstance.setProps({
          placement: props.placement,
          trigger: props.trigger,
          hideOnClick: props.hideOnClick
        })
      })

      watch(() => props.disabled, (val) => {
        if(val) {
          tippyInstance.disable()
        } else {
          tippyInstance.enable()
        }
      })

      const commandHandler = (...args) => {
        ctx.emit('command', ...args)
      }

      const handleClick = () => {
        tippyInstance.hide()
      }

      // provide
      provide('dropdown', {
        instance,
        handleClick,
        commandHandler,
        hideOnClick: computed(() => props.hideOnClick)
      })

      return {
        referenceEl, popperEl,
        commandHandler, handleClick,
        computedStyle,
        isSubmenuExpanded
      }
    }
  })
</script>
