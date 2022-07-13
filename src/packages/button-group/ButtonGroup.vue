<template>
  <div class="sui-button-group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { groupProps, buttonGroupCtxKey } from './button-group'

const props = defineProps(groupProps)

provide(buttonGroupCtxKey, {
  size: props.size,
  shape: props.shape,
  type: props.type
})
</script>
