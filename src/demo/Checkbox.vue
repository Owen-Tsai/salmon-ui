<template>
  <demo name="Checkbox">
    <s-checkbox v-model="model">{{ model }}</s-checkbox>
    <p>{{ model2 }}</p>
    <s-checkbox
      v-for="i in 4"
      v-model="model2"
      name="group"
      :value="i"
    >Option {{ i }}</s-checkbox>
    <p>{{ model3 }}</p>
    <s-checkbox
      v-for="i in 4"
      v-model="model3"
      name="group2"
      :value="`${i}`"
    >Option {{ i }}</s-checkbox>
  </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SCheckbox from 'salmon-ui/checkbox'

const model = ref(false)
const model2 = ref([])
const model3 = ref(['1', '3'])
</script>