<template>
  <demo name="Switch">
    <s-switch v-model="v1"></s-switch>
    <s-switch v-model="v1" active-color="#16a34a" inactive-color="#dc2626"></s-switch>
    <s-switch v-model="v1" type="success"></s-switch>
    <s-switch v-model="v1" type="warning"></s-switch>
    <br>
    <s-switch v-model="v2" active-text="开" inactive-text="关"></s-switch>
    <s-switch v-model="v2" :active-icon="Check" :inactive-icon="Close"></s-switch>
  </demo>
</template>

<script lang="ts" setup>
import SSwitch from 'salmon-ui/switch'
import { ref } from 'vue'
import { Check, Close } from '@salmon-ui/icons'

const v1 = ref(false)
const v2 = ref(true)
</script>

<style lang="scss" scoped>
.sui-switch {
  margin: 4px;
}
</style>