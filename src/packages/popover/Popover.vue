<template>
  <div class="sui-popover">
    <div class="sui-popover__reference" ref="referenceEl">
      <slot name="reference"></slot>
    </div>
    <div class="sui-popover__popper" ref="popperEl">
      <div class="sui-popover__title" v-if="title">{{ title }}</div>
      <div class="sui-popover__content">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    PropType,
    ref,
    watch,
    watchEffect
  } from 'vue'
  import { Placement } from '@popperjs/core'
  import { basePopperConfig, triggerType } from '@/utils/popper-options'
  import tippy from 'tippy.js'
  import throwError from "@/utils/class.error";

  export default defineComponent({
    name: 'SPopover',
    props: {
      title: String,
      content: String,
      modelValue: {
        type: Boolean,
        default: undefined
      },
      placement: {
        type: String as PropType<Placement>,
        default: 'bottom'
      },
      hideOnClick: {
        type: Boolean,
        default: true
      },
      trigger: {
        type: String,
        default: 'hover'
      },
      offset: Object as PropType<[number, number]>,
      maxWidth: [Number, String],
      disabled: Boolean
    },
    setup(props, ctx) {
      // handle error
      if(props.trigger === 'manual' && props.modelValue === undefined) {
        throwError('sui-popover', 'v-model is required when `trigger` is set to `manual`')
      }

      let tippyInstance: any = null
      const referenceEl: any = ref<null | Element>(null)
      const popperEl: any = ref<null | Element>(null)

      const options = {
        placement: props.placement,
        hideOnClick: props.hideOnClick,
        trigger: triggerType(props.trigger),
        offset: props.offset,
        theme: 'light-border',
        interactive: true,
        onHide: (instance) => { ctx.emit('before-hide', instance) },
        onShow: (instance) => { ctx.emit('before-show', instance) },
        onHidden: (instance) => { ctx.emit('after-hide', instance) },
        onShown: (instance) => { ctx.emit('after-show', instance) }
      }

      onMounted(() => {
        tippyInstance = tippy(referenceEl.value, {
          ...basePopperConfig, ...options, ...{
            content: popperEl.value,
          }
        })

        if(props.disabled) {
          tippyInstance.disable()
        }
        if(props.trigger === 'manual') {
          if(props.modelValue) {
            tippyInstance.show()
          } else {
            tippyInstance.hide()
          }

          tippyInstance.setProps({
            onShown: (instance) => {
              ctx.emit('update:modelValue', true)
              ctx.emit('after-show', instance)
            },
            onHidden: (instance) => {
              ctx.emit('update:modelValue', false)
              ctx.emit('after-hide', instance)
            },
          })
        }
      })

      watchEffect(() => {
        if(!tippyInstance) return
        tippyInstance.setProps({
          placement: props.placement,
          maxWidth: props.maxWidth,
          trigger: props.trigger,
          offset: props.offset,
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

      if(props.trigger === 'manual') {
        watch(() => props.modelValue, (val) => {
          if(val) {
            tippyInstance.show()
          } else {
            tippyInstance.hide()
          }
        })
      }

      return {
        referenceEl, popperEl
      }
    }
  })
</script>
