<template>
  <demo name="Select">
    <p>value is {{ model }}</p>
    <s-select v-model="model">
      <s-option
        v-for="option in opts" :key="option.value"
        :value="option.value"
      >{{ option.label }}</s-option>
    </s-select>

    <p>value is {{ model2 }}</p>
    <s-select v-model="model2" filterable>
      <s-option
        v-for="option in opts" :key="option.value"
        :value="option.value"
      >{{ option.label }}</s-option>
    </s-select>
  </demo>
</template>

<script lang="ts" setup>
import SSelect from 'salmon-ui/select'
import SOption from 'salmon-ui/select-option'
import { ref } from 'vue'

const model = ref('')
const model2 = ref()
const opts = ref<Record<string, string>[]>([])

setTimeout(() => {
  opts.value = [
    { value: 'AAA', label: 'AAA' },
    { value: 'BBB', label: 'BBB' },
    { value: 'CCC', label: 'CCC' },
    { value: 'DDD', label: 'DDD' }
  ]
}, 2000)
</script>