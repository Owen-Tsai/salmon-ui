<template>
  <div class="demo-container">
    <div class="demo-container-header">
      <h2>{{ name }}</h2>
    </div>

    <div class="demo-container-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType
} from 'vue'

export default defineComponent({
  name: 'Demo',
  props: {
    name: String as PropType<string>
  }
})
</script>

<style scoped>
.demo-container {
  border: 1px solid var(--sui-border-1);
}
.demo-container-header {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--sui-fill-2);
  border-bottom: 1px dashed var(--sui-border-1);
}
.demo-container-body {
  padding: 16px;
}

h2 {
  margin: 0;
}
</style>