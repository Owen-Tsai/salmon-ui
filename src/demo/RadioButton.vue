<template>
  <demo name="Radio Button">
    <p>{{ model }}</p>
    <s-radio-group v-model="model">
      <s-radio-button
        v-for="i in 6"
        name="group"
        :value="i"
      >Opt {{ i }}</s-radio-button>
    </s-radio-group>
    <s-radio-group v-model="model" size="small">
      <s-radio-button
        v-for="i in 6"
        name="group"
        :value="i"
        :disabled="i === 4"
      >Opt {{ i }}</s-radio-button>
    </s-radio-group>
    <s-radio-group v-model="model" size="large">
      <s-radio-button
        v-for="i in 6"
        name="group"
        :value="i"
      >Opt {{ i }}</s-radio-button>
    </s-radio-group>
  </demo>
</template>

<script lang="ts" setup>
import SRadioButton from 'salmon-ui/radio-button'
import SRadioGroup from 'salmon-ui/radio-group'
import { ref } from 'vue'

const model = ref(3)
</script>

<style lang="scss" scoped>
.sui-radio-group {
  & + & {
    margin-top: 8px;
  }
}
</style>