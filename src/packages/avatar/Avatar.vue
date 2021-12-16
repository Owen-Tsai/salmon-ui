<template>
  <span class="sui-avatar" :class="cls" :style="sizeStyle">
    <img
      v-if="(src || srcSet) && !hasLoadError"
      :src="src"
      :alt="alt"
      :srcset="srcSet"
      :style="fitStyle"
      @error="handleError"
    />
    <slot v-else></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

const _sizes = ['large', 'small', '']

export default defineComponent({
  name: 'SAvatar',
  props: {
    src: String,
    srcSet: String,
    alt: String,
    size: {
      type: [String, Number],
      default: '',
      validator: (v: string | number) => {
        if (typeof v === 'string') {
          return _sizes.includes(v)
        }

        return true
      }
    },
    shape: {
      type: String,
      default: 'circle',
      validator: (v: string) => {
        return ['circle', 'square'].includes(v)
      }
    },
    fit: {
      type: String,
      default: 'cover'
    }
  },
  emits: ['error'],
  setup(props, ctx) {
    // state
    const hasLoadError = ref(false)

    // classes
    const cls = computed(() => {
      const arr: string[] = []
      const prefix = 'sui-avatar--'
      if (typeof props.size === 'string' && props.size !== '') {
        arr.push(`${prefix}${props.size}`)
      }
      if (props.shape) {
        arr.push(`${prefix}${props.shape}`)
      }

      return arr
    })

    // styles
    const sizeStyle = computed(() => {
      return typeof props.size === 'number' ? {
        height: `${props.size}px`,
        width: `${props.size}px`,
        lineHeight: `${props.size}px`
      } : {}
    })
    const fitStyle = computed(() => ({
      objectFit: props.fit
    }))

    // methods
    const handleError = (evt) => {
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
