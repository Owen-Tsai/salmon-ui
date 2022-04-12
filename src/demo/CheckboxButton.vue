<template>
  <demo name="Checkbox Button">
    <p>{{ model }}</p>
    <s-checkbox-group v-model="model">
      <s-checkbox-button
        v-for="i in 4"
        :value="i"
      >Option {{ i }}</s-checkbox-button>
    </s-checkbox-group>
    <p>{{ model }}</p>
    <s-checkbox-group :min="1" :max="3" v-model="model">
      <s-checkbox-button
        v-for="i in 4"
        :value="i"
      >Option {{ i }}</s-checkbox-button>
    </s-checkbox-group>
  </demo>
</template>

<script lang="ts" setup>
import SCheckboxGroup from 'salmon-ui/checkbox-group'
import SCheckboxButton from 'salmon-ui/checkbox-button'
import { ref } from 'vue'

const model = ref([])
</script>