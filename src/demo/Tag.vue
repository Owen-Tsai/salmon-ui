<template>
  <demo name="Tag">
    <s-tag>Web Dev</s-tag>
    <s-tag type="success">Vue</s-tag>
    <s-tag type="error" rounded>Angular</s-tag>
    <s-tag type="warning">React</s-tag>
    <s-tag dismissible>Closable</s-tag>
    <s-tag type="error">
      <s-icon :name="AlertFill"></s-icon>
      NSFW
    </s-tag>
    <s-tag dismissible rounded>Rounded</s-tag>
    <s-tag fill="dark">Web Dev</s-tag>
    <s-tag type="success" fill="dark">Vue</s-tag>
    <s-tag type="error" rounded fill="dark">Angular</s-tag>
    <s-tag type="warning" fill="dark">React</s-tag>
    <s-tag dismissible fill="dark">Closable</s-tag>
    <s-tag fill="none">Web Dev</s-tag>
    <s-tag type="success" fill="none">Vue</s-tag>
    <s-tag type="error" rounded fill="none">Angular</s-tag>
    <s-tag type="warning" fill="none">React</s-tag>
    <s-tag size="large" dismissible fill="none">Closable</s-tag>
    <s-tag size="small" dismissible fill="dark" type="warning">Closable</s-tag>
  </demo>
</template>

<script lang="ts" setup>
import STag from 'salmon-ui/tag'
import { AlertFill } from '@salmon-ui/icons'
</script>

<style scoped>
.sui-tag {
  margin: 4px;
}
</style>