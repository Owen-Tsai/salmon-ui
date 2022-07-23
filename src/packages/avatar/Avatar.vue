<template>
  <span
    ref="wrapperEl"
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
      @load="handleLoaded"
    >
    <resize-wrapper
      v-else
      @resize="autoFontSizeHandler"
    >
      <span
        ref="textEl"
        :class="{ 'auto-width': autoFontSize }"
      >
        <slot />
      </span>
    </resize-wrapper>
  </span>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  inject,
  nextTick,
  onMounted,
  StyleValue
} from 'vue'

import {
  GroupContext,
  groupCtxKey
} from 'salmon-ui/avatar-group/avatar-group'
import ResizeWrapper from 'salmon-ui/_components/ResizeWrapper'
import { avatarProps } from './avatar'

const props = defineProps(avatarProps)
const emit = defineEmits(['error', 'load'])

const wrapperEl = ref<HTMLElement>()
const textEl = ref<HTMLElement>()

const group = inject(groupCtxKey, undefined as GroupContext)
const autoFontSize = ref(group?.autoFontSize || props.autoFontSize)

const cls = computed(() => [
  'sui-avatar',
  `sui-avatar--${group?.size || props.size}`,
  `sui-avatar--${group?.shape || props.shape}`,
])

const hasLoadError = ref(false)

const sizeStyle = computed<StyleValue>(() => {
  const size = group?.size || props.size
  return (typeof size === 'number') ? {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`,
  } : {}
})

const fitStyle = computed<StyleValue>(() => (
  props.fit ? { objectFit: props.fit } : {}
))

const handleError = (e: Event) => {
  hasLoadError.value = true
  emit('error', e)
}

const handleLoaded = (e: Event) => {
  emit('load', e)
}

const autoFontSizeHandler = () => {
  if (props.src || props.srcSet || !autoFontSize.value) return
  nextTick(() => {
    if (!wrapperEl.value || !textEl.value) return
    const width = wrapperEl.value.clientWidth
    const textWidth = textEl.value.clientWidth

    const scale = width / (textWidth + 8)
    if (scale < 1) {
      textEl.value.style.transform = `scale(${scale}) translate(-50%)`
    }
  })
}

onMounted(() => {
  if (autoFontSize.value) {
    autoFontSizeHandler()
  }
})
</script>
