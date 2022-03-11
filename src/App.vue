<template>
  <div class="demo-page">
    <div class="demo-row">
      <demo-button></demo-button>
      <demo-button-group></demo-button-group>
    </div>
    <div class="demo-row">
      <demo-icon></demo-icon>
      <demo-alert></demo-alert>
    </div>
    <div class="demo-row">
      <!-- <demo-avatar></demo-avatar>
      <demo-badge></demo-badge> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import DemoButton from '@/demo/Button.vue'
import DemoAlert from '@/demo/Alert.vue'
import DemoButtonGroup from '@/demo/ButtonGroup.vue'
import DemoIcon from '@/demo/Icon.vue'
// import DemoAvatar from '@/demo/Avatar.vue'
// import DemoBadge from '@/demo/Badge.vue'
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
.demo-container {
  margin-bottom: 16px;
}
</style>