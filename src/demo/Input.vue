<template>
  <demo name="Input">
    <s-input v-model="model"></s-input>
    <s-input v-model="model" disabled></s-input>
    <s-input v-model="model" :prefix-icon="Search"></s-input>
  </demo>
</template>

<script lang="ts" setup>
import SInput from 'salmon-ui/input'
import {
  ref
} from 'vue'

import {
  Search
} from '@salmon-ui/icons'

const model = ref('')
</script>

<style lang="scss" scoped>
.sui-input {
  & + & {
    margin-top: 8px;
  }
}
</style>