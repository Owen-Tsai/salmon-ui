<template>
  <div
    :class="[
      'sui-rate',
      disabled ? 'is-disabled' : null
    ]"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuetext="text"
    :aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0"
  >
    <span
      v-for="(item, key) in max" :key="key"
      class="sui-rate__item"
      @mousemove="handleMouseMove(item, $event)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(item)"
    >
      <s-icon
        class="sui-rate__icon"
        :style="getItemStyle(item)"
      >
        <slot>
          <star-fill></star-fill>
        </slot>
      </s-icon>
      <s-icon
        v-if="showDecimalIcon(item)"
        class="sui-rate__icon-decimal"
        :color="color"
        :style="decimalIconStyle"
      >
        <slot>
          <star-fill></star-fill>
        </slot>
      </s-icon>
    </span>

    <span
      v-if="(showScore || showText) && currentValue !== 0"
      class="sui-rate__text"
    >{{ text }}</span>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref,
    computed,
    watch
  } from 'vue'

  import SIcon from '../icon'

  import {
    StarFill
  } from '@salmon-ui/icons'

  export default defineComponent({
    name: 'SRate',
    components: {
      SIcon,
      StarFill
    },
    props: {
      modelValue: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 5
      },
      allowHalf: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      icon: {
        type: String,
        default: 'star'
      },
      showText: Boolean,
      showScore: Boolean,
      texts: {
        type: Array as PropType<string[]>,
        default: () => ['很差', '不满', '一般', '尚可', '很好']
      },
      inactiveColor: {
        type: String,
        default: '#e8e8e8'
      },
      color: {
        type: String,
        default: '#ffc107'
      }
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      // data
      const currentValue = ref(props.modelValue)
      const pointerAtHalf = ref(true)
      const hoverIndex = ref(-1)

      // computed
      const text = computed(() => {
        if (props.showText) {
          return props.texts[Math.ceil(currentValue.value) - 1]
        }
        if (props.showScore) {
          return String(currentValue.value)
        }

        return ''
      })

      const decimalValue = computed(() =>
        props.modelValue * 100 - Math.floor(props.modelValue) * 100
      )

      const decimalIconStyle = computed(() => {
        let width = ''

        if (props.disabled) {
          width = `calc(${decimalValue.value}% - 3px)`
        } else if (props.allowHalf) {
          width = `calc(50% - 3px)`
        }

        return {
          width
        }
      })

      // methods
      const getItemColor = (i: number): string => {
        return i <= currentValue.value
          ? props.color
          : props.inactiveColor
      }

      const getItemStyle = (i: number) => {
        return {
          color: getItemColor(i)
        }
      }

      const handleMouseMove = (val: number, event: MouseEvent) => {
        // display a overview value based on cursor position
        if (props.disabled) return
        if (props.allowHalf) {
          let target = event.target as HTMLElement

          while (!target.classList.contains('sui-rate__item')) {
            target = target.parentNode as HTMLElement
          }

          pointerAtHalf.value = event.offsetX * 2 <= target.clientWidth
          currentValue.value = pointerAtHalf.value ? val - 0.5 : val
        } else {
          currentValue.value = val
        }

        hoverIndex.value = val
      }

      const handleMouseLeave = () => {
        // reset to the actual value
        if (props.disabled) return
        if (props.allowHalf) {
          pointerAtHalf.value = props.modelValue !== Math.floor(props.modelValue)
        }
        currentValue.value = props.modelValue
        hoverIndex.value = -1
      }

      const handleClick = (val) => {
        // actually change the modelValue
        if (props.disabled) return
        if (props.allowHalf && pointerAtHalf.value) {
          emit('update:modelValue', currentValue.value)
          emit('change', currentValue.value)
        } else {
          emit('update:modelValue', val)
          emit('change', val)
        }
      }

      const showDecimalIcon = (idx: number) => {
        let showWhenDisabled = props.disabled &&
          decimalValue.value > 0 &&
          idx - 1 < props.modelValue &&
          idx > props.modelValue

        let showWhenAllowHalf = props.allowHalf &&
          pointerAtHalf.value &&
          idx - 0.5 <= currentValue.value &&
          idx > currentValue.value

        return showWhenAllowHalf || showWhenDisabled
      }

      // watcher
      watch(() => props.modelValue, (val) => {
        currentValue.value = val
        pointerAtHalf.value = props.modelValue !== Math.floor(props.modelValue)
      })

      watch(() => hoverIndex.value, (val) => {
        if (val === -1) {
          if (currentValue.value !== props.modelValue) {
            currentValue.value = props.modelValue
          }
        }
      })

      return {
        text,
        currentValue,
        decimalIconStyle,

        showDecimalIcon,
        getItemStyle,
        handleMouseMove,
        handleMouseLeave,
        handleClick
      }
    }
  })
</script>
