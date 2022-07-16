<template>
  <div class="sui-avatar-group">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import {
  groupProps,
  groupCtxKey,
} from './avatar-group'

const props = defineProps(groupProps)

provide(groupCtxKey, props)
</script>
