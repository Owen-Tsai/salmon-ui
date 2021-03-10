<template>
  <div class="sui-dropdown">
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
    computed
  } from 'vue'
  import tippy from 'tippy.js'
  import { Placement } from 'tippy.js'
  import {dropdownPopperConfig, themeType, triggerType} from '@/utils/popper-options'

  const _placements = [
    'top', 'top-start', 'top-end',
    'bottom', 'bottom-start', 'bottom-end'
  ]

  export default defineComponent({
    name: 'SDropdown',
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
      maxHeight: Number
    },
    setup(props, ctx) {
      let tippyInstance: any = null
      const referenceEl = ref<Element>()
      const popperEl = ref<Element>()
      const instance = getCurrentInstance()

      const options = {
        placement: props.placement,
        hideOnClick: props.hideOnClick,
        trigger: triggerType(props.trigger),
        theme: themeType('light'),
        interactive: true,
        onHide: (instance) => { ctx.emit('before-hide', instance) },
        onShow: (instance) => {ctx.emit('before-show', instance)},
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

      watch([
        () => props.placement,
        () => props.trigger,
        () => props.hideOnClick
      ], (val) => {
        tippyInstance.setProps({
          placement: val[0],
          trigger: val[1],
          hideOnClick: val[2]
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
        computedStyle
      }
    }
  })
</script>
