<template>
  <div
    class="sui-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot></slot>

    <template v-if="false">
      <slot name="separator"></slot>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SBreadcrumb'
  })
</script>
