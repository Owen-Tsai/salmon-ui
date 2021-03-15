<template>
  <div
    class="sui-slider__track-mark"
    :style="computedStyle"
  >{{ computedLabel }}</div>
</template>

<script lang="ts">
  import {
    defineComponent, computed, PropType
  } from 'vue'

  export default defineComponent({
    name: 'SSliderMark',
    props: {
      mark: {
        type: [String, Object] as PropType<string | Record<string, unknown>>,
        default: () => undefined
      }
    },
    setup(props) {
      const computedLabel = computed(() => {
        return typeof props.mark === 'string' ? props.mark : props.mark.label
      })

      const computedStyle = computed(() => {
        if(typeof props.mark === 'object') {
          return props.mark?.style
        }

        return {}
      })

      return {
        computedLabel,
        computedStyle
      }
    }
  })
</script>
