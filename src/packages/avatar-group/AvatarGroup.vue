<template>
  <div
    ref="avatarGroup"
    class="sui-avatar-group"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  provide,
  onMounted
} from 'vue'
import {
  groupProps,
  groupCtxKey,
} from './avatar-group'

const props = defineProps(groupProps)
const avatarGroup = ref<HTMLDivElement>()

provide(groupCtxKey, props)

onMounted(() => {
  const els = avatarGroup.value?.children
  if (els && els.length > 0) {
    const margin = props.offset || Math.floor((els[0] as HTMLSpanElement).clientWidth / 4)
    Array.from(els).forEach((el, idx) => {
      if (idx !== 0) {
        (el as HTMLSpanElement).style.marginLeft = `-${margin}px`
      }
    })
  }
})
</script>
