<template>
  <div
    :class="[
      'sui-badge',
      type ? `sui-badge--${type}` : null
    ]"
  >
    <slot />

    <transition name="zoom-in-center">
      <sup
        v-show="computedValue || dot || $slots.content"
        class="sui-badge__content"
        :class="{ 'is-dot': dot }"
        :style="dotStyle"
      >
        <slot name="content">
          <span v-text="computedValue" />
        </slot>
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  StyleValue
} from 'vue'

const props = defineProps({
  dot: Boolean,
  dotStyle: {
    type: Object as PropType<StyleValue>,
    default: undefined
  },
  type: {
    type: String as PropType<
      'primary' | 'success' | 'warning' | 'error' | 'default'
    >,
    default: 'default'
  },
  value: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: Number,
    default: 99
  }
})

const computedValue = computed(() => {
  if (props.dot) return undefined
  if (typeof props.value === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }

  return props.value
})
</script>
