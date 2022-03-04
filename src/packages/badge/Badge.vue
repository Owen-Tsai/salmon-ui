<template>
  <div
    :class="[
      'sui-badge',
      type ? `sui-badge--${type}` : null
    ]"
  >
    <slot></slot>

    <transition name="zoom-in-center">
      <sup
        v-show="computedValue || dot"
        class="sui-badge__content"
        :class="{ 'is-dot': dot }"
        :style="posStyle"
        v-text="computedValue"
      ></sup>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  CSSProperties
} from 'vue'

import props from './badge'

export default defineComponent({
  name: 'SBadge',
  props: props,
  setup(props) {
    const computedValue = computed(() => {
      if (props.dot) {
        return
      }
      if (typeof props.value === 'number') {
        return props.value > props.max ? `${props.max}+` : props.value
      }

      return props.value
    })

    const posStyle = computed(() => {
      const style: CSSProperties = {}

      if (props.top) {
        style.top = `${props.top}px`
      }
      if (props.right) {
        style.right = `${props.right}px`
      }

      return style
    })

    return {
      computedValue, posStyle
    }
  }
})
</script>
