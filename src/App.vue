<template>
  <div class="demo-page">
    <demo-button></demo-button>

    <demo-button></demo-button>

    <demo-button></demo-button>

    <demo-button></demo-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DemoButton from '@/demo/Button.vue'

export default defineComponent({
  components: {
    DemoButton
  }
})
</script>

<style scoped>
.demo-page {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
</style>