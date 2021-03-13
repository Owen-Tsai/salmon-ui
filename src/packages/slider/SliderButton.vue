<template>
  <div
    class="sui-slider__button-wrapper"
    ref="slideButtonEl"
    :class="{
      'is-hovering': hovering,
      'is-dragging': dragging
    }"
    :style="buttonWrapperStyle"
    tabindex="0"
  >
    <s-tooltip
      class="sui-slider__tooltip"
      ref="tooltipEl"
      :content="formattedValue"
    >
      <div class="sui-slider__button"></div>
    </s-tooltip>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  import STooltip from '../tooltip'

  export default defineComponent({
    name: 'SSlider',
    components: {
      STooltip
    },
    props: {

    }
  })
</script>
