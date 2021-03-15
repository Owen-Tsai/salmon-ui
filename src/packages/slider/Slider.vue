<template>
  <div
    class="sui-slider"
    :class="{
      'is-vertical': vertical,
      'is-disabled': disabled
    }"
    ref="slideWrapperEl"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-disabled="disabled"
  >
    <div
      class="sui-slider__track"
      ref="sliderTrackEl"
      :style="trackStyle"
      @click="onSliderTrackClick"
    >
      <div
        class="sui-slider__track-thumb"
        :style="trackThumbStyle"
      ></div>
      <s-slider-button
        ref="sliderButtonFirst"
        v-model="valueFirst"
        :vertical="vertical"
      ></s-slider-button>
      <s-slider-button
        v-if="range"
        ref="sliderButtonSecond"
        v-model="valueSecond"
        :vertical="vertical"
      ></s-slider-button>

      <div class="sui-slider__stops">
        <div
          class="sui-slider__stop"
          v-for="(item, key) in stops"
          :key="key"
          :style="getStopStyle(item)"
        ></div>
      </div>
      <template v-if="markList.length > 0">
        <div class="sui-slider__stop-marks">
          <div
            v-for="(item, key) in markList"
            :key="key"
            :style="getStopStyle(item.position)"
            class="sui-slider__stop el-slider__stop-mark"
          ></div>
        </div>
        <div class="sui-slider-marks">
          <s-slider-track-mark
            v-for="(item, key) in markList"
            :key="key"
            :mark="item.mark"
            :style="getStopStyle(item.position)"
          ></s-slider-track-mark>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    reactive,
    computed
  } from 'vue'

  import SSliderButton from './SliderButton.vue'
  import SSliderTrackMark from './SliderTrackMark.vue'
  import { useSlider } from './useSlider'
  import { useMarks, useStops } from './useSliderMark'
  import { useDataWatchers } from './useDataWatchers'

  export default defineComponent({
    name: 'SSlider',
    components: {
      SSliderButton, SSliderTrackMark
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
      showTooltip: {
        type: Boolean,
        default: true
      },
      formatTooltip: {
        type: Function as PropType<(val: number) => number | string>,
        default: undefined,
      },
      disabled: Boolean,
      range: Boolean,
      vertical: Boolean,
      height: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: undefined
      },
      marks: Object
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const initData = reactive({
        firstValue: 0,
        secondValue: 0,
        oldValue: 0,
        dragging: false,
        sliderSize: 1
      })

      const {
        sliderEl,
        firstButton,
        secondButton,
        minValue,
        maxValue,
        trackStyle,
        trackThumbStyle,
        resetSize,
        emitChange,
        onSliderClick,
      } = useSlider(props, initData, emit)

      const {
        stops,
        getStopStyle,
      } = useStops(props, initData, minValue, maxValue)

      const markList = useMarks(props)

      useDataWatchers(props, initData, minValue, maxValue, emit)

      const precision = computed(() => {
        let precisions = [props.min, props.max, props.step].map(item => {
          let decimal = ('' + item).split('.')[1]
          return decimal ? decimal.length : 0
        })
        return Math.max.apply(null, precisions)
      })


    }
  })
</script>

