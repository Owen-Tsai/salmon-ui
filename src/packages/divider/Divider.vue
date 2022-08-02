<template>
  <div
    :class="cls"
    role="separator"
    :style="computedStyle"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  StyleValue
} from 'vue'

const props = defineProps({
  direction: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'horizontal'
  },
  margin: {
    type: [Number, String] as PropType<
      number | 'small' | 'medium' | 'large' | 'mini'
    >,
    default: 'medium'
  },
  lineStyle: {
    type: String as PropType<'solid' | 'dashed' | 'dotted'>,
    default: 'solid'
  }
})

const cls = computed(() => [
  'sui-divider',
  `sui-divider--${props.direction}`,
  typeof props.margin === 'string' ? `sui-divider--${props.margin}` : null
])

const computedStyle = computed<StyleValue>(() => {
  if (typeof props.margin === 'number') {
    return props.direction === 'vertical' ? {
      margin: `0 ${props.margin}px`
    } : {
      margin: `${props.margin}px 0`
    }
  }

  return {}
})
</script>
