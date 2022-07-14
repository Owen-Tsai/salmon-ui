<template>
  <i
    class="sui-icon"
    :style="styles"
  >
    <slot>
      <component :is="name" />
    </slot>
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type {
  StyleValue,
  PropType,
  Component
} from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: undefined
  },
  size: {
    type: Number,
    default: undefined
  },
  name: {
    type: Object as PropType<Component>,
    default: undefined
  }
})

const styles = computed(() => {
  const result: StyleValue = {}
  if (props.color) {
    result.color = props.color
  }
  if (props.size) {
    result.fontSize = `${props.size}px`
  }

  return result
})
</script>
