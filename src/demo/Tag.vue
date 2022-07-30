<template>
  <demo name="Tag">
    <s-tag type="primary">Web Dev</s-tag>
    <s-tag type="success">Vue</s-tag>
    <s-tag type="error">Angular</s-tag>
    <s-tag type="warning">React</s-tag>
    <s-tag dismissible>Closable</s-tag>
    <br>
    <s-tag dismissible type="primary">Web Dev</s-tag>
    <s-tag dismissible type="success">Vue</s-tag>
    <s-tag dismissible type="error">Angular</s-tag>
    <s-tag dismissible type="warning">React</s-tag>
    <br>
    <s-tag dismissible type="error">
      <s-icon :name="AlertFill"></s-icon>
      NSFW
    </s-tag>
    <br>
    <s-tag dismissible>Rounded</s-tag>
    <br>
    <s-tag outlined type="primary">Web Dev</s-tag>
    <s-tag type="success" outlined>Vue</s-tag>
    <s-tag type="error" rounded outlined>Angular</s-tag>
    <s-tag type="warning" outlined>React</s-tag>
    <s-tag type="primary" dismissible outlined>Closable</s-tag>
    <s-tag outlined>Outlined</s-tag>
    <br>
    <s-tag size="small">Web Dev</s-tag>
    <s-tag size="large">Large</s-tag>
    <s-tag size="small">small</s-tag>
    <s-tag size="large" dismissible>Large</s-tag>
    <s-tag size="small" dismissible type="warning" outlined>small</s-tag>
    <br>
    <s-tag color="#ec4899">#ec4899</s-tag>
    <s-tag color="#f25f51">#f25f51</s-tag>
    <s-tag color="#4f46e5">#4f46e5</s-tag>
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
