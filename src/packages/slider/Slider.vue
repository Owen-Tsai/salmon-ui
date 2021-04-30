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
    reactive,
    watch,
    computed
  } from 'vue'

  import SSliderHandle from './Handle.vue'
  import SSliderMarker from './Marker.vue'

  import { useSlider } from './useSlider'
  import { useMarkers, useStops } from './useMarkers'
  import throwError from '@/utils/class.error'

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
      showTooltip: {
        type: Boolean,
        default: true
      },
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
    emits: ['update:modelValue', 'change', 'input'],
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

      const {
        stops,
        getStopStyle
      } = useStops(props, initData, minValue, maxValue)

      const markerList = useMarkers(props)

      const precision = computed(() => {
        let precisions =
          [props.max, props.min, props.step].map(item => {
            let decimal = String(item).split('.')[1]
            return decimal ? decimal.length : 0
          })

        return Math.max.apply(null, precisions)
      })

      const emitEvents = (val: number[] | number) => {
        emit('update:modelValue', val)
        emit('input', val)
      }
      const isValueChanged = () => {
        if(props.range) {
          return ![minValue, maxValue].every((item, index) =>
            item === initData.oldValue[index]
          )
        } else {
          return props.modelValue === initData.oldValue
        }
      }
      const setValues = () => {
        if(props.min > props.max) {
          throwError('[s-slider]', 'prop `min` cannot be greater than `max`')
          return
        }

        const val = props.modelValue
        if(props.range && Array.isArray(val)) {
          if(val[1] < props.min) {
            emitEvents([props.min, props.min])
          } else if(val[0] > props.max) {
            emitEvents([props.max, props.max])
          } else if(val[0] < props.min) {
            emitEvents([props.min, val[1]])
          } else if(val[1] > props.max) {
            emitEvents([val[0], props.max])
          } else {
            // normal situation
            initData.firstValue = val[0]
            initData.secondValue = val[1]
            if(isValueChanged()) {
              initData.oldValue = val.slice()
            }
          }
        } else if(!props.range && typeof val === 'number' && !isNaN(val)) {
          if(val < props.min) {
            emitEvents(props.min)
          } else if(val > props.max) {
            emitEvents(props.max)
          } else {
            // normal situation
            initData.firstValue = val
          }
        }
      } // end setValues()

      // watchers
      watch(() => initData.isDragging, val => {
        if(!val) {
          setValues()
        }
      })
      watch(() => initData.firstValue, val => {
        if(props.range) {
          emitEvents([minValue.value, maxValue.value])
        } else {
          emitEvents(val)
        }
      })
      watch(() => initData.secondValue, () => {
        if(props.range) {
          emitEvents([minValue.value, maxValue.value])
        }
      })
      watch(() => props.modelValue, (val, oldVal) => {
        if(
          initData.isDragging
          || Array.isArray(val)
          && Array.isArray(oldVal)
          && val.every((item, i) => item === oldVal[i])
        ) { return }

        setValues()
      })
      watch(() => [props.min, props.max], () => {
        setValues()
      })
    }
  })
</script>
