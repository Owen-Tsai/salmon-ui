<template>
  <demo name="Select">
    
  </demo>
</template>

<script lang="ts" setup>
import SSelect from 'salmon-ui/select'
import SOption from 'salmon-ui/select-option'
import { ref } from 'vue'

const model = ref('')
const model2 = ref([])
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