<template>
  <div
    :class="cls"
    role="separator"
  />
</template>

<script lang="ts" setup>
import {
  computed,
  PropType
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
  typeof props.margin === 'string' ? props.margin : null
])
</script>
