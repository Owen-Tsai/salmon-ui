<template>
  <demo name="Tag">
    <s-tag type="primary">Web Dev</s-tag>
    <s-tag type="success">Vue</s-tag>
    <s-tag type="error" rounded>Angular</s-tag>
    <s-tag type="warning">React</s-tag>
    <s-tag dismissible>Closable</s-tag>
    <br>
    <s-tag type="error">
      <s-icon :name="AlertFill"></s-icon>
      NSFW
    </s-tag>
    <br>
    <s-tag dismissible rounded>Rounded</s-tag>
    <br>
    <s-tag fill="dark" type="primary">Web Dev</s-tag>
    <s-tag type="success" fill="dark">Vue</s-tag>
    <s-tag type="error" rounded fill="dark">Angular</s-tag>
    <s-tag type="warning" fill="dark">React</s-tag>
    <s-tag type="primary" dismissible fill="dark">Closable</s-tag>
    <s-tag type="primary" fill="none">Web Dev</s-tag>
    <s-tag type="success" fill="none">Vue</s-tag>
    <s-tag type="error" rounded fill="none">Angular</s-tag>
    <s-tag type="warning" fill="none">React</s-tag>
    <br>
    <s-tag size="large">Large</s-tag>
    <s-tag size="small" fill="dark" type="warning">small</s-tag>
    <s-tag size="large" dismissible>Large</s-tag>
    <s-tag size="small" dismissible fill="dark" type="warning">small</s-tag>
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