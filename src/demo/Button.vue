<template>
  <demo name="Button">
    <s-button type="primary">主要按钮</s-button>
  </demo>
</template>

<script lang="ts">
import SButton from 'salmon-ui/button'
import Demo from '@/demo/components/Demo.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SButton,
    Demo
  }
})
</script>

<style lang="stylus" scoped></style>