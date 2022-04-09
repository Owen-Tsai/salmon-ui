<template>
  <demo name="Radio">
    <p>{{ model }}</p>
    <s-radio v-model="model" :value="true">Turn on</s-radio>
    <s-radio v-model="model" :value="false">Turn off</s-radio>
    <br>
    <p>{{ model2 }}</p>
    <s-radio
      v-for="i in 5" :key="i"
      v-model="model2"
      :value="i"
      name="group-named"
    >Option {{ i }}</s-radio>
    <br>
    <p>Disabled</p>
    <s-radio disabled v-model="model3" name="group-disabled" value="1">Disabled</s-radio>
    <s-radio disabled v-model="model3" name="group-disabled" value="2">Disabled</s-radio>
    <p>Grouped: {{ model4 }}</p>
    <s-radio-group v-model="model4">
      <s-radio :value="1">Jinan</s-radio>
      <s-radio :value="2">Beijing</s-radio>
      <s-radio :value="3">Chengdu</s-radio>
      <s-radio :value="4">London</s-radio>
    </s-radio-group>
  </demo>
</template>

<script lang="ts" setup>
import SRadio from 'salmon-ui/radio'
import SRadioGroup from 'salmon-ui/radio-group'
import { ref } from 'vue'

const model = ref(false)
const model2 = ref(1)
const model3 = ref('1')
const model4 = ref(1)
</script>