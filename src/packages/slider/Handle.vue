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
    inject,
    computed,
    ComputedRef,
    toRefs,
    ref,
    watch,
    reactive,
    nextTick
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
    setup(props, { emit }) {
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
        onDragStart(event)

        window.addEventListener('mousemove', onDragging)
        window.addEventListener('touchmove', onDragging)
        window.addEventListener('mouseup', onDragEnd)
        window.addEventListener('touchend', onDragEnd)
        window.addEventListener('contextmenu', onDragEnd)
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

      const onDragEnd = () => {
        if (isDragging.value) {
          setTimeout(() => {
            isDragging.value = false
            hideTooltip()

            if (!isClick.value) {
              setPosition(handlerData.newPosition)
              emitChange.value()
            }
          }, 0)

          window.removeEventListener('mousemove', onDragging)
          window.removeEventListener('touchmove', onDragging)
          window.removeEventListener('mouseup', onDragEnd)
          window.removeEventListener('touchend', onDragEnd)
          window.removeEventListener('contextmenu', onDragEnd)
        }
      }

      const setPosition = async (newPosition: number) => {
        if(isNaN(newPosition) || !newPosition) return

        if (newPosition < 0) {
          newPosition = 0
        } else if (newPosition > 100) {
          newPosition = 100
        }

        const lengthPerStep = 100 / ((max.value - min.value) / step.value)
        const stepCount = Math.round(newPosition / lengthPerStep)
        let value = stepCount * lengthPerStep * (max.value - min.value) * 0.01 + min.value
        value = parseFloat(value.toFixed(precision.value))
        emit('update:modelValue', value)

        if (!isDragging.value && props.modelValue !== handlerData.oldValue) {
          handlerData.oldValue = props.modelValue
        }

        await nextTick()
        isDragging.value && displayTooltip()
        updateTooltip()
      }

      const updateTooltip = () => {
        if (!tooltipEl.value) return
        const instance = tooltipEl.value?._tippy

        if (!instance) return
        instance.setProps({
          animation: false
        })
        instance.hide()
        instance.show()
        instance.setProps({
          animation: true
        })
      }

      // watchers
      watch(() => isDragging.value, (val) => {
        // TODO: call injected method `updateDragging`
        // to inform parent component to update state
      })

      return {
        tooltipEl,
        tooltipVisible,
        isHovering,
        isDragging,
        wrapperStyle,
        formattedValue,

        handleMouseEnter,
        handleMouseLeave,
        handleButtonDown,
      }

    }
  })
</script>
