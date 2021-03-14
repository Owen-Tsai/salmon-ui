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
    defineComponent,
    reactive
  } from 'vue'

  import STooltip from '../tooltip'

  export default defineComponent({
    name: 'SSlider',
    components: {
      STooltip
    },
    props: {
      modelValue: {
        type: Number,
        default: 0
      }
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
      const initData = reactive({
        hovering: false,
        dragging: false,
        isClick: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: 0,
        oldValue: props.modelValue
      })

      const {
        tooltipEl,

      }
    }
  })
</script>
