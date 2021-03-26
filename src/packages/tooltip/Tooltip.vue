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
  import { Placement } from '@popperjs/core'
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
        theme: themeType(props.theme),
      }

      onMounted(() => {
        if(reference.value !== null) {
          tippyInstance = tippy(reference.value, {
            ...options, ...basePopperConfig
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
          content: props.content,
          placement: props.placement,
          allowHTML: props.useHTML,
          hideOnClick: props.hideOnClick,
          trigger: props.trigger,
          offset: props.offset,
          theme: props.theme
        })
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
