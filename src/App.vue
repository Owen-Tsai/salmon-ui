<template>
  <div class="demo-page">
    <div class="demo-row">
      <demo-button></demo-button>
    </div>
    <div class="demo-row">
      <demo-alert></demo-alert>
    </div>
    <div class="demo-row">
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DemoButton from '@/demo/Button.vue'
import DemoAlert from '@/demo/Alert.vue'

export default defineComponent({
  components: {
    DemoButton, DemoAlert
  }
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.demo-page {
  display: flex;
}
.demo-row {
  width: 33.333%;
  padding: 8px;
  flex-shrink: 0;
  flex-grow: 0;
}
</style>