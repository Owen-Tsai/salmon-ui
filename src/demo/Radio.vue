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
  </demo>
</template>

<script lang="ts" setup>
import SRadio from 'salmon-ui/radio'
import { ref } from 'vue'

const model = ref(false)
const model2 = ref(1)
const model3 = ref('1')
</script>