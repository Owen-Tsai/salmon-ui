<template>
  <demo name="Input">
    <s-input v-model="model"></s-input>
  </demo>
</template>

<script lang="ts" setup>
import SInput from 'salmon-ui/input'
import {
  ref
} from 'vue'

const model = ref('')
</script>