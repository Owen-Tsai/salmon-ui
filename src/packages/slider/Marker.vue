<template>
  <div
    class="sui-slider__marker-text"
    :style="marker.style"
  >{{ label }}</div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    computed
  } from 'vue'

  export default defineComponent({
    name: 'SSliderMarker',
    props: {
      marker: {
        type: [String, Object] as PropType<string | Record<string, unknown>>,
        default: ''
      }
    },
    setup(props) {
      const label = computed(() =>
        typeof props.marker === 'string' ? props.marker : props.marker.label
      )

      return {
        label
      }
    }
  })
</script>
