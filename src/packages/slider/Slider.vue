<template>
  <div
    :class="[
      'sui-slider', ...{
        'is-vertical': vertical
      }
    ]"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-disabled="disabled"
  >
    <div
      :class="[
        'sui-slider__track', ...{
          'is-disabled': disabled
        }
      ]"
      ref="sliderEl"
      :style="trackStyle"
      @click="handleTrackClick"
    >
      <div class="sui-slider__bar" :style="barStyle"></div>

      <s-slider-handle
        ref="firstHandleEl"
        v-model="firstValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
      ></s-slider-handle>
      <s-slider-handle
        v-if="range"
        ref="secondHandleEl"
        v-model="secondValue"
        :vertical="vertical"
        :tooltip-class="tooltipClass"
      ></s-slider-handle>

      <!-- stops -->
      <div v-if="showStops">
        <div
          class="sui-slider__stop"
          v-for="(item, key) in stops"
          :key="key"
          :style="getStopStyle(item)"
        ></div>
      </div>
      <template v-if="markList.length > 0">
        <div>
          <div
            class="sui-slider__stop sui-slider__marker-stop"
            v-for="(item, key) in markerList"
            :key="key"
            :style="getStopStyle(item.position)"
          ></div>
        </div>

        <div class="sui-slider__markers">
          <s-slider-marker
            v-for="(item, key) in markerList"
            :key="key"
            :mark="item.mark"
            :style="getStopStyle(item.position)"
          ></s-slider-marker>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    reactive
  } from 'vue'

  import SSliderHandle from './Handle.vue'
  import SSliderMarker from './Marker.vue'

  import useSlider from './useSlider'

  export default defineComponent({
    name: 'SSlider',
    components: {
      SSliderHandle,
      SSliderMarker
    },
    props: {
      modelValue: {
        type: [Number, Array] as PropType<number | number[]>,
        default: 0
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      showStops: Boolean,
      vertical: Boolean,
      noTooltip: Boolean,
      formatTooltip: {
        type: Function as PropType<(val: number) => number | string>,
        default: undefined
      },
      disabled: Boolean,
      range: Boolean,
      height: {
        type: String,
        default: ''
      },
      debounce: {
        type: Number,
        default: 300
      },
      label: {
        type: String,
        default: undefined
      },
      tooltipClass: {
        type: String,
        default: ''
      },
      markers: Object
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      // data
      const initData = reactive({
        firstValue: 0,
        secondValue: 0,
        oldValue: 0,
        isDragging: false,
        sliderSize: 1
      })

      const {
        sliderEl,
        firstHandleEl,
        secondHandleEl,
        minValue,
        maxValue,
        trackStyle,
        barStyle,
        resetSize,
        setPosition,
        emitChange,
        handleSliderClick
      } = useSlider(props, initData, emit)

      
    }
  })
</script>
