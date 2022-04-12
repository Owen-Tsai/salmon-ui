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
    <p>Disabled</p>
    <s-checkbox v-model="model4" disabled>Option</s-checkbox>
    <s-checkbox v-model="model5" disabled>Option</s-checkbox>
    <p>Grouped {{ model6 }}</p>
    <s-checkbox-group v-model="model6" name="group3" :min="1" :max="3">
      <s-checkbox v-for="i in 4" :value="i">Option {{ i }}</s-checkbox>
    </s-checkbox-group>
  </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SCheckbox from 'salmon-ui/checkbox'
import SCheckboxGroup from 'salmon-ui/checkbox-group'

const model = ref(false)
const model2 = ref([])
const model3 = ref(['1', '3'])
const model4 = ref(false)
const model5 = ref(true)
const model6 = ref([])
</script>