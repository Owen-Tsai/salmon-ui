<template>
  <demo name="Input">
    <s-input v-model="model"></s-input>
    <s-input v-model="model" disabled></s-input>
    <s-input v-model="model" :prefix-icon="Search"></s-input>
    <s-input
      v-model="model"
      :prefix-icon="Search"
      :suffix-icon="Lock"
      type="password"
      show-password-toggler
    ></s-input>
    <s-input>
      <template #prepend>Hello</template>
      <template #prefix>
        <s-icon><Search></Search></s-icon>
      </template>
    </s-input>
    <s-input :prefix-icon="MoneyCnyCircle">
      <template #append>元</template>
    </s-input>
  </demo>
</template>

<script lang="ts" setup>
import SInput from 'salmon-ui/input'
import {
  ref
} from 'vue'

import {
  Search,
  Lock,
  MoneyCnyCircle
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