<template>
  <div class="sui-tooltip" ref="reference">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    onMounted,
    watch,
    watchEffect,
    ref,
    PropType
  } from 'vue'

  import tippy from 'tippy.js'
  import { Placement, sticky } from 'tippy.js'

  import OverlayManager from '@/utils/overlay-manager'

  import {
    basePopperConfig,
    themeType,
    triggerType
  } from '@/utils/popper-options'

  import throwError from '@/utils/class.error'

  export default defineComponent({
    name: 'STooltip',
    props: {
      content: String,
      theme: {
        type: String,
        default: 'dark',
        validator: (v: string) => {
          return ['dark', 'light'].includes(v)
        }
      },
      useHTML: Boolean,
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
      modelValue: {
        type: Boolean,
        default: undefined
      },
      instant: Boolean,
      offset: Object as PropType<[number, number]>,
    },
    setup(props) {
      // handle error
      if(props.trigger === 'manual' && props.modelValue === undefined) {
        throwError('sui-tooltip', 'v-model is required when `trigger` is set to `manual`')
      }

      let tippyInstance: any = null
      const reference = ref<null | HTMLElement>(null)

      const options = {
        content: props.content,
        placement: props.placement,
        allowHTML: props.useHTML,
        hideOnClick: props.hideOnClick,
        trigger: triggerType(props.trigger),
        offset: props.offset,
        zIndex: OverlayManager.nextZIndex(),
        sticky: true,
        theme: themeType(props.theme),
      }

      onMounted(() => {
        if(reference.value !== null) {
          tippyInstance = tippy(reference.value, {
            ...options, ...basePopperConfig, ...{
              animation: props.instant ? false : basePopperConfig.animation,
              plugins: [sticky]
            }
          })
        }

        if(props.trigger === 'manual') {
          if(props.modelValue) {
            tippyInstance.show()
          } else {
            tippyInstance.hide()
          }
        }
      })

      watchEffect(() => {
        if(!tippyInstance) return
        tippyInstance.setProps({
          placement: props.placement,
          allowHTML: props.useHTML,
          hideOnClick: props.hideOnClick,
          trigger: props.trigger,
          offset: props.offset,
          theme: props.theme
        })
      })

      watch(() => props.content, (val) => {
        tippyInstance?.setContent(val)
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
        reference
      }
    }
  })
</script>
