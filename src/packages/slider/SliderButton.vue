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
    reactive,
    toRefs
  } from 'vue'

  import STooltip from '../tooltip'
  import useSliderButton from './useSliderButton'

  export default defineComponent({
    name: 'SSlider',
    components: {
      STooltip
    },
    props: {
      modelValue: {
        type: Number,
        default: 0
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
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
        showTooltip,
        tooltipVisible,
        buttonWrapperStyle,
        formattedValue,
        handleMouseEnter,
        handleMouseLeave,
        onButtonDown,
        onLeftKeyDown, onRightKeyDown,
        setPosition
      } = useSliderButton(props, initData, emit)

      const { hovering, dragging } = toRefs(initData)

      return {
        tooltipEl,
        tooltipVisible,
        showTooltip,
        buttonWrapperStyle,
        formattedValue,
        handleMouseEnter,
        handleMouseLeave,
        onButtonDown,
        onLeftKeyDown,
        onRightKeyDown,
        setPosition,
        hovering,
        dragging
      }
    }
  })
</script>
