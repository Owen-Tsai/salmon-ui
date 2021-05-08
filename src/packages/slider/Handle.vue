<template>
  <div
    :class="[
      'sui-slider__handle-wrapper',
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
      v-if="showTooltip"
      placement="top"
      ref="tooltipEl"
      :content="formattedValue"
      trigger="manual"
      v-model="tooltipVisible"
    >
      <div :class="[
        'sui-slider__handle',
        ...{
          'is-hovering':
        }
      ]"></div>
    </s-tooltip>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    inject,
    computed,
    ComputedRef,
    toRefs,
    ref,
    reactive
  } from 'vue'

  import {
    ISliderProvider
  } from './slider.type'

  import debounce from 'lodash/debounce'
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
      showTooltip: {
        type: Boolean,
        default: true
      }
    },
    emits: ['update:modelValue'],
    setup(props) {
      // injected
      const slider: ISliderProvider = inject('sliderComponent', {} as ISliderProvider)

      const {
        min,
        max,
        step,
        disabled,
        precision,
        showTooltip,
        formatTooltip,
        sliderSize,
        resetSize,
        emitChange,
      } = toRefs(slider)

      // data
      const tooltipEl = ref()
      const tooltipVisible = ref(false)
      const isDragging = ref(false)
      const isHovering = ref(false)
      const isClick = ref(false)

      const handlerData = reactive({
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: 0,
        oldValue: props.modelValue
      })

      // computed
      const currentPosition = computed(() =>
        `${(props.modelValue - min.value) / (max.value - min.value) * 100}%`
      )
      const enableFormat = computed(() =>
        formatTooltip.value instanceof Function
      )
      const formattedValue = computed(() => {
        if(enableFormat.value) {
          return (formatTooltip as ComputedRef).value(props.modelValue)
        }

        return props.modelValue
      })
      const wrapperStyle = computed((): Partial<CSSStyleDeclaration> =>
        props.vertical
          ? { bottom: currentPosition.value }
          : { left: currentPosition.value }
      )

      // methods
      const displayTooltip = debounce(() => {
        showTooltip.value && (tooltipVisible.value = true)
      }, 50)
      const hideTooltip = debounce(() => {
        showTooltip.value && (tooltipVisible.value = false)
      })
      const handleMouseEnter = () => {
        isHovering.value = true
        displayTooltip()
      }
      const handleMouseLeave = () => {
        isHovering.value = false
        hideTooltip()
      }
      const getClientXY = (event: MouseEvent | TouchEvent) => {
        let clientX: number
        let clientY: number

        if(event.type.startsWith('touch')) {
          clientY = (event as TouchEvent).touches[0].clientY
          clientX = (event as TouchEvent).touches[0].clientX
        } else {
          clientY = (event as MouseEvent).clientY
          clientX = (event as MouseEvent).clientX
        }

        return {
          clientX, clientY
        }
      }
      const handleButtonDown = (event: MouseEvent | TouchEvent) => {
        if(disabled) return

        event.preventDefault()

      }
      const onDragStart = (event: MouseEvent | TouchEvent) => {
        isDragging.value = true
        isClick.value = true

        const {
          clientX, clientY
        } = getClientXY(event)

        if(props.vertical) {
          handlerData.startY = clientY
        } else {
          handlerData.startX = clientX
        }

        handlerData.startPosition = parseFloat(currentPosition.value)
        handlerData.newPosition = handlerData.startPosition
      }
      const onDragging = (event: MouseEvent | TouchEvent) => {
        if(!isDragging.value) return

        isClick.value = false
        displayTooltip()
        resetSize.value()
        let diff: number

        const {
          clientX, clientY
        } = getClientXY(event)
        if (props.vertical) {
          handlerData.currentY = clientY
          diff = (handlerData.startY - handlerData.currentY) / sliderSize.value * 100
        } else {
          handlerData.currentX = clientX
          diff = (handlerData.currentX - handlerData.startX) / sliderSize.value * 100
        }
        handlerData.newPosition = handlerData.startPosition + diff
        setPosition(handlerData.newPosition)
      }

      const setPosition = () => {

      }


      return {
        tooltipEl,
        tooltipVisible,
        isHovering,
        isDragging,
        wrapperStyle,
        formattedValue,
        handleMouseEnter,
        handleMouseLeave
      }

    }
  })
</script>
