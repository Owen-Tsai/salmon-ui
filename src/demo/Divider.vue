<template>
  <demo name="Divider">
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    <s-divider />
    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
    <s-divider />
    <div>
      <span>Item 1</span>
      <s-divider direction="vertical" />
      <span>Item 2</span>
      <s-divider direction="vertical" />
      <span>Item 3</span>
    </div>
  </demo>
</template>

<script lang="ts" setup>
import SDivider from 'salmon-ui/divider'
</script>