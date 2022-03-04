<template>
  <span
    :class="['sui-avatar', ...cls]"
    :style="sizeStyle"
  >
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    >
    <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed
} from 'vue'

import { buildProp } from '@/utils/props'

export default defineComponent({
  name: 'SAvatar',
  props: {
    src: {
      type: String,
      default: ''
    },
    srcSet: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    size: buildProp({
      type: [String, Number],
      values: ['large', 'default', 'small'],
      validator: (val: unknown): val is number => typeof val === 'number'
    } as const),
    shape: buildProp({
      values: ['circle', 'square']
    } as const),
    fit: buildProp({
      values: ['cover', 'contain', 'scale-down', 'fill', 'none']
    } as const)
  },
  emits: ['error'],
  setup(props, ctx) {
    // state
    const hasLoadError = ref(false)

    // classes
    const cls = computed(() => {
      const arr: string[] = []
      const prefix = 'sui-avatar--'
      if (props.size && typeof props.size === 'string') {
        if (props.size !== 'default') {
          arr.push(`${prefix}${props.size}`)
        }
      }
      if (props.shape && props.shape !== 'square') {
        arr.push(`${prefix}${props.shape}`)
      }

      return arr
    })

    // styles
    const sizeStyle = computed(() => {
      return typeof(props.size) === 'number' ? {
        height: `${props.size}px`,
        width: `${props.size}px`,
        lineHeight: `${props.size}px`
      } : {}
    })
    const fitStyle = computed(() => ({
      objectFit: props.fit
    }))

    // methods
    const handleError = (evt: Event) => {
      hasLoadError.value = true
      ctx.emit('error', evt)
    }

    return {
      hasLoadError,
      cls, sizeStyle, fitStyle, handleError
    }
  }
})
</script>
