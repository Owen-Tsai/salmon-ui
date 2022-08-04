<template>
  <demo name="Link">
    <s-link href="/">Link</s-link>
    <s-link type="error" href="/">Link</s-link>
    <s-link type="success" href="/">Link</s-link>
    <s-link type="warning" href="/">Link</s-link>
    <s-link hover="background" href="/">Link</s-link>
    <s-link hover="background" type="error" href="/">Link</s-link>
    <s-link hover="background" type="success" href="/">Link</s-link>
    <s-link hover="background" type="warning" href="/">Link</s-link>
    <br>
    <s-link disabled href="/">Link</s-link>
    <s-link disabled type="error" href="/">Link</s-link>
    <s-link disabled type="success" href="/">Link</s-link>
    <s-link disabled type="warning" href="/">Link</s-link>
    <br>
    <s-link href="/" icon>Link</s-link>
    <s-link type="error" href="/" :icon="Lock">Link</s-link>
    <s-link hover="background" href="/" icon>Link</s-link>
    <s-link hover="background" type="error" href="/" :icon="Lock">Link</s-link>
    <s-link disabled hover="background" href="/" icon>Link</s-link>
    <s-link disabled hover="background" type="error" href="/" :icon="Lock">Link</s-link>
  </demo>
</template>

<script lang="ts" setup>
import SLink from 'salmon-ui/link'
import { Lock } from '@salmon-ui/icons'
</script>

<style lang="scss" scoped>
.sui-link {
  margin: 8px;
}
</style>
