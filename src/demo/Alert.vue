<template>
  <demo name="Alert">
    <s-alert dismissable>This is a normal info banner.</s-alert>
    <s-alert dismissable type="error">Uncaught SyntaxError: Unexpected Token '+'</s-alert>
    <s-alert dismissable type="warning">No network connection.</s-alert>
    <s-alert dismissable type="success">Nice work, dude!</s-alert>
    <s-alert dismissable title="With Title!">
      你好，欢迎使用 Salmon UI
    </s-alert>
    <s-alert outlined>I cannot be closed.</s-alert>
    <s-alert type="error">
      I have a custom action
      <template #action>
        <s-button type="primary" danger>Abort</s-button>
      </template>
    </s-alert>
    <s-alert type="success" :icon="EmotionHappyFill" outlined>
      <template #title>
        Title with a <a href="https://owen-cai.space/salmon-icons">link</a>!
      </template>
      I have a custom icon, and a title passed in via slot, and super long content.
    </s-alert>
  </demo>
</template>

<script lang="ts" setup>
import SAlert from 'salmon-ui/alert'
import SButton from 'salmon-ui/button'
import { EmotionHappyFill } from '@salmon-ui/icons'
</script>

<style scoped>
.sui-alert:not(:first-child) {
  margin-top: 16px;
}
</style>