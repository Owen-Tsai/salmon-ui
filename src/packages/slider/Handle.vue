<template>
  <div
    :class="[
      'sui-slider__handle-wrapper',
      ...{
        'is-hovering': isHovering,
        'is-dragging': isDragging
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleButtonDown"
    @touchstart="handleButtonDown"
    :style="wrapperStyle"
    ref="handleEl"
    tabindex="0"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
  >
    <s-tooltip
      v-if="!noTooltip"
      placement="top"
      ref="tooltipEl"
      content="formattedValue"
      trigger="manual"
      v-model="tooltipVisible"
    >
      <div :class="[
        'sui-slider__handle',
        ...{
          'is-hovering': isHovering,
          'is-dragging': isDragging
        }
      ]"></div>
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
    name: 'SSliderHandle',
    components: {
      STooltip
    },
    props: {
      modelValue: {
        type: Number,
        default: 0
      },
      vertical: Boolean,
      tooltipClass: String,
      noTooltip: Boolean
    },
    emits: ['update:modelValue'],
    setup(props, ctx) {
      // data
      const initData = reactive({
        isHovering: false,
        isDragging: false,
        isClick: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPos: 0,
        currentPos: 0,
        oldValue: props.modelValue
      })


    }
  })
</script>
