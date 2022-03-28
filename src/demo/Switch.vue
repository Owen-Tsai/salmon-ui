<template>
  <demo name="Switch">
    <s-switch v-model="v1"></s-switch>
  </demo>
</template>

<script lang="ts" setup>
import SSwitch from 'salmon-ui/switch'
import { ref } from 'vue'

const v1 = ref(false)
</script>