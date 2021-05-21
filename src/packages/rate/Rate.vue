<template>
  <div
    :class="[
      'sui-rate',
      disabled ? 'is-disabled' : null,
      readonly ? 'is-readonly' : null
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
      @mousemove="handleMouseMove(item)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(item)"
    >
      <s-icon
        class="sui-rate__icon"
        :color="getItemColor(item)"
        :duo-tone-color="getItemColor(item)"
        :name="icon"
      ></s-icon>
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

  export default defineComponent({
    name: 'SRate',
    components: {
      SIcon
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
      disabled: Boolean,
      readonly: Boolean,
      icon: {
        type: String,
        default: 'star'
      },
      showText: Boolean,
      showScore: Boolean,
      texts: {
        type: Array as PropType<string[]>,
        default: ['很差', '不满', '一般', '尚可', '很好']
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

      // methods
      const getItemColor = (i: number): string => {
        return i <= currentValue.value
          ? props.color
          : props.inactiveColor
      }

      const handleMouseMove = (val) => {
        // display a overview value based on cursor position
        if (props.readonly || props.disabled) return
        currentValue.value = val
      }

      const handleMouseLeave = () => {
        // reset to the actual value
        if (props.readonly || props.disabled) return
        currentValue.value = props.modelValue
      }

      const handleClick = (val) => {
        // actually change the modelValue
        if (props.readonly || props.disabled) return
        emit('update:modelValue', val)
        emit('change', val)
      }

      // watcher
      watch(() => props.modelValue, (val) => {
        currentValue.value = val
      })

      return {
        text,
        currentValue,

        getItemColor,
        handleMouseMove,
        handleMouseLeave,
        handleClick
      }
    }
  })
</script>
