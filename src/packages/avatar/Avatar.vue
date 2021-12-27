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
import {
  defineComponent,
  ref,
  computed
} from 'vue'

import {
  _avatarShape,
  _avatarObjectFit,
  _avatarSize
} from './avatar.type'

import { buildProp } from '@/utils/props'

export default defineComponent({
  name: 'SAvatar',
  props: {
    src: String,
    srcSet: String,
    alt: String,
    size: buildProp({
      type: [String, Number],
      values: _avatarSize
    }),
    shape: buildProp({
      values: _avatarShape
    }),
    fit: buildProp({
      values: _avatarObjectFit
    })
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
      return typeof(props.size!) === 'number' ? {
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
