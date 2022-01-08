<template>
  <div
    :class="[
      'sui-slider',
      vertical ? 'is-vertical' : null,
      disabled ? 'is-disabled' : null
    ]"
    role="slider"
    :aria-valuemin="min"
    :aria-valuemax="max"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    :aria-disabled="disabled"
  >
    <div
      :class="[
        'sui-slider__track',
        disabled ? 'is-disabled' : null
      ]"
      ref="sliderEl"
      :style="trackStyle"
      @click="handleSliderClick"
    >
      <div class="sui-slider__bar" :style="barStyle"></div>

      <s-slider-handle
        ref="firstHandleEl"
        v-model="firstValue"
        :vertical="vertical"
      ></s-slider-handle>
      <s-slider-handle
        v-if="range"
        ref="secondHandleEl"
        v-model="secondValue"
        :vertical="vertical"
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
      <template v-if="markerList.length > 0">
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
            :marker="item.marker"
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
  ref,
  toRefs,
  reactive,
  watch,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  provide
} from 'vue'

import SSliderHandle from './Handle.vue'
import SSliderMarker from './Marker.vue'

import error from '@/utils/class.error'
import { processSizeType } from '@/utils/utils'

import {
  ISliderData,
  ISliderHandle,
  Marker,
  SliderHandleRefs
} from './slider.type'

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
      default: 1,
      validator: (v: number) => {
        return v > 0
      }
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
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: undefined
    },
    markers: Object
  },
  emits: ['update:modelValue', 'change', 'input'],
  setup(props, {emit}) {
    if (props.min > props.max) {
      error('sui-slider', 'prop `min` should not be greater than `max`')
    }

    // data
    const isDragging = ref(false)
    const sliderEl = ref()
    const firstHandleEl = ref()
    const secondHandleEl = ref()

    const sliderData: ISliderData = reactive({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      sliderSize: 1
    })

    const handleRefs: SliderHandleRefs = {
      firstHandleEl,
      secondHandleEl
    }

    // computed
    const minValue = computed(() =>
      Math.min(sliderData.firstValue, sliderData.secondValue)
    )
    const maxValue = computed(() =>
      Math.max(sliderData.firstValue, sliderData.secondValue)
    )
    const precision = computed(() => {
      let precisions = [props.min, props.max, props.step].map(item => {
        let decimal = ('' + item).split('.')[1];
        return decimal ? decimal.length : 0;
      });
      return Math.max.apply(null, precisions);
    })

    const stops = computed(() => {
      if (!props.showStops) return []

      const stopCount = (props.max - props.min) / props.step
      const lengthPerStep = 100 / ((props.max - props.min) / props.step)
      let result: number[] = []
      for (let i = 0; i < stopCount; i++) {
        result.push(i * lengthPerStep)
      }

      if (props.range) {
        return result.filter(step =>
          step < 100 * (minValue.value - props.min) / (props.max - props.min) ||
          step > 100 * (maxValue.value - props.max) / (props.max - props.min)
        )
      } else {
        return result.filter(step =>
          step > 100 * (sliderData.firstValue - props.min) / (props.max - props.min)
        )
      }
    })

    const markerList = computed(() => {
      if (!props.markers) return []

      const markerKeys = Object.keys(props.markers)
      return markerKeys.map(parseFloat)
        .sort((a, b) => a - b)
        .filter(point => point >= props.min && point <= props.max)
        .map((point): Marker => ({
          point,
          position: (point - props.min) * 100 / (props.max - props.min),
          marker: props.markers?.[point]
        }))
    })

    const barSize = computed(() =>
      props.range
        ? `${100 * (maxValue.value - minValue.value) / (props.max - props.min)}%`
        : `${100 * (sliderData.firstValue - props.min) / (props.max - props.min)}%`
    )
    const barStart = computed(() =>
      props.range
        ? `${100 * (minValue.value - props.min) / (props.max - props.min)}%`
        : '0%'
    )
    const barStyle = computed(() => {
      return props.vertical ? {
        height: barSize.value,
        bottom: barStart.value
      } : {
        width: barSize.value,
        left: barStart.value
      } as CSSStyleDeclaration
    })

    const trackStyle = computed(() => (
        props.vertical ? {height: processSizeType(props.height)} : {}
      ) as CSSStyleDeclaration
    )

    const isValueChanged = () => {
      if (props.range) {
        return ![minValue.value, maxValue.value].every((item, index) =>
          item === sliderData.oldValue[index]
        )
      } else {
        return props.modelValue === sliderData.oldValue
      }
    }

    // methods
    const emitEvents = (val: number[] | number) => {
      emit('update:modelValue', val)
      emit('input', val)
    }

    const setValues = () => {
      const val = props.modelValue
      if (props.range && Array.isArray(val)) {
        if (val[1] < props.min) {
          emitEvents([props.min, props.min])
        } else if (val[0] > props.max) {
          emitEvents([props.max, props.max])
        } else if (val[0] < props.min) {
          emitEvents([props.min, val[1]])
        } else if (val[1] > props.max) {
          emitEvents([val[0], props.max])
        } else {
          // normal situation
          sliderData.firstValue = val[0]
          sliderData.secondValue = val[1]
          if (isValueChanged()) {
            sliderData.oldValue = val.slice()
          }
        }
      } else if (!props.range && typeof val === 'number' && !isNaN(val)) {
        if (val < props.min) {
          emitEvents(props.min)
        } else if (val > props.max) {
          emitEvents(props.max)
        } else {
          // normal situation
          sliderData.firstValue = val
        }
      }
    } // end setValues()

    const resetSize = () => {
      if (sliderEl.value) {
        sliderData.sliderSize = sliderEl.value[`client${props.vertical ? 'Height' : 'Width'}`];
      }
    }

    const setPosition = (percentage: number) => {
      const targetValue = props.min + percentage * (props.max - props.min) / 100
      if (!props.range) {
        firstHandleEl.value.setPosition(percentage)
        return
      }

      let handleRefString: string
      if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
        handleRefString =
          sliderData.firstValue < sliderData.secondValue ? 'firstHandleEl' : 'secondHandleEl'
      } else {
        handleRefString =
          sliderData.firstValue > sliderData.secondValue ? 'firstHandleEl' : 'secondHandleEl'
      }

      const handleComp = handleRefs[handleRefString].value as ISliderHandle
      handleComp.setPosition(percentage)
    }

    const handleSliderClick = (event: MouseEvent) => {
      if (props.disabled || isDragging.value) return

      resetSize()
      if (props.vertical) {
        const sliderOffsetBottom = sliderEl.value.getBoundingClientRect().bottom
        setPosition(
          (sliderOffsetBottom - event.clientY) / sliderData.sliderSize * 100
        )
      } else {
        const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
        setPosition(
          (event.clientX - sliderOffsetLeft) / sliderData.sliderSize * 100
        )
      }

      emitChange()
    }

    const emitChange = async () => {
      await nextTick()
      emit('change', props.range ? [minValue.value, maxValue.value] : props.modelValue)
    }

    const getStopStyle = (position: number) => {
      return props.vertical
        ? {bottom: `${position}%`}
        : {left: `${position}%`} as CSSStyleDeclaration
    }

    const updateDragging = (val: boolean) => {
      isDragging.value = val
    }

    // watchers
    watch(() => isDragging.value, val => {
      if (!val) {
        setValues()
      }
    })
    watch(() => sliderData.firstValue, val => {
      if (props.range) {
        emitEvents([minValue.value, maxValue.value])
      } else {
        emitEvents(val)
      }
    })
    watch(() => sliderData.secondValue, () => {
      if (props.range) {
        emitEvents([minValue.value, maxValue.value])
      }
    })
    watch(() => props.modelValue, (val, oldVal) => {
      if (
        isDragging.value
        || Array.isArray(val)
        && Array.isArray(oldVal)
        && val.every((item, i) => item === oldVal[i])
      ) {
        return
      }

      setValues()
    })
    watch(() => [props.min, props.max], () => {
      setValues()
    })

    // lifecycle hooks
    onMounted(async () => {
      let valueText: string
      if (props.range) {
        if (Array.isArray(props.modelValue)) {
          sliderData.firstValue = Math.max(props.min, props.modelValue[0])
          sliderData.secondValue = Math.min(props.max, props.modelValue[1])
        } else {
          sliderData.firstValue = props.min
          sliderData.secondValue = props.max
        }

        sliderData.oldValue = [sliderData.firstValue, sliderData.secondValue]
        valueText = `${sliderData.firstValue} - ${sliderData.secondValue}`
      } else {
        if (typeof props.modelValue !== 'number' || isNaN(props.modelValue)) {
          sliderData.firstValue = props.min
        } else {
          sliderData.firstValue = Math.min(props.max, Math.max(props.min, props.modelValue))
        }

        sliderData.oldValue = sliderData.firstValue
        valueText = String(sliderData.firstValue)
      }

      sliderEl.value.setAttribute('aria-valuetext', valueText)
      const label = `slider: ${props.min} - ${props.max}`
      sliderEl.value.setAttribute('aria-label', props.label ? props.label : label)

      window.addEventListener('resize', resetSize)
      await nextTick()
      resetSize()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resetSize)
    })

    const {
      firstValue,
      secondValue,
      sliderSize
    } = toRefs(sliderData)

    // provide
    provide('sliderComponent', {
      ...toRefs(props),
      sliderSize: sliderSize,
      disabled: props.disabled,
      precision: precision,
      emitChange: emitChange,
      resetSize: resetSize,
      updateDragging: updateDragging,
    })

    return {
      sliderEl, firstHandleEl, secondHandleEl,
      trackStyle, barStyle,
      firstValue,
      secondValue,

      stops,
      markerList,

      handleSliderClick,
      getStopStyle,
    }
  }
})
</script>
