<template>
  <demo name="Alert">
    <s-alert>This is a normal info banner.</s-alert>
    <s-alert type="error">Uncaught SyntaxError: Unexpected Token '+'</s-alert>
    <s-alert type="warning">No network connection.</s-alert>
    <s-alert type="success">Nice work, dude!</s-alert>
    <s-alert title="With Title!">
      你好，欢迎使用 Salmon UI
    </s-alert>
    <s-alert :dismissible="false">I cannot be closed.</s-alert>
  </demo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SAlert from 'salmon-ui/alert'
import {
  EmotionHappy,
  WifiOff,
  ThumbUpFill,
  CloseCircle,
  Archive
} from '@salmon-ui/icons'

export default defineComponent({
  components: {
    EmotionHappy,
    WifiOff,
    ThumbUpFill,
    CloseCircle,
    Archive,
    SAlert
  },

})
</script>

<style scoped>
.sui-alert:not(:first-child) {
  margin-top: 16px;
}
</style>