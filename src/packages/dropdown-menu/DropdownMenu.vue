<template>
  <ul class="sui-dropdown-menu">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  export default defineComponent({
    name: 'SDropdownMenu',
  })
</script>
