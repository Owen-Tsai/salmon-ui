<template>
  <div
    class="sui-slider__marker-text"
    :style="mark.style"
  >{{ label }}</div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref
  } from 'vue'

  export default defineComponent({
    name: 'SSliderMarker',
    props: {
      mark: {
        type: [String, Object] as PropType<string | Record<string, unknown>>,
        default: ''
      }
    },
    setup(props) {
      const label = ref(
        typeof props.mark === 'string' ? props.mark : props.mark.label
      )

      return {
        label
      }
    }
  })
</script>
