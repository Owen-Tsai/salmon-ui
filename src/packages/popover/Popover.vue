<template>
  <div class="sui-popover">
    <div class="sui-popover__reference" ref="referenceEl">
      <slot name="reference"></slot>
    </div>
    <div class="sui-popover__popper" ref="popperEl">
      <div class="sui-popover__title" v-if="title">{{ title }}</div>
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent, onMounted, PropType, ref
  } from 'vue'
  import { Placement } from '@popperjs/core'
  import {basePopperConfig, triggerType} from '@/utils/popper-options'
  import tippy from 'tippy.js'

  export default defineComponent({
    name: 'SPopover',
    props: {
      title: String,
      content: String,
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
    },
    setup(props, ctx) {
      let tippyInstance: any = null
      const referenceEl: any = ref<null | HTMLElement>(null)
      const popperEl: any = ref<null | HTMLElement>(null)

      onMounted(() => {
        const options = {
          content: popperEl.value,
          placement: props.placement,
          hideOnClick: props.hideOnClick,
          trigger: triggerType(props.trigger),
          offset: props.offset,
          theme: 'light-border',
          interactive: true,
          onHide: (instance) => { ctx.emit('before-hide', instance) },
          onShow: (instance) => { ctx.emit('before-show', instance) },
          onHidden: (instance) => { ctx.emit('after-hide', instance) },
          onShown: (instance) => { ctx.emit('after-hide', instance) }
        }

        tippyInstance = tippy(referenceEl.value, {
          ...basePopperConfig, ...options
        })

        registerCloseHandler()
      })

      const registerCloseHandler = () => {
        const closeEls = popperEl.value.querySelectorAll('[data-popper-close]')
        if(closeEls.length > 0) {
          closeEls.forEach(el => {
            el.addEventListener('click', () => {
              tippyInstance.hide()
            })
          })
        }
      }

      return {
        referenceEl, popperEl
      }
    }
  })
</script>
