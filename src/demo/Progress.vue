<template>
  <demo name="Progress">
    <s-progress :percentage="percentage"></s-progress>
    <s-progress :percentage="percentage" status="error"></s-progress>
    <s-progress :percentage="percentage" status="success"></s-progress>
    <s-progress :percentage="percentage" status="active"></s-progress>

    <s-progress :percentage="percentage" type="gauge"></s-progress>
    <s-progress :percentage="percentage" type="circular"></s-progress>
    <s-progress :percentage="percentage" type="gauge" :color="colors"></s-progress>

    <br>

    <s-progress :percentage="percentage" :color="colors"></s-progress>

    <br>

    <s-button-group>
      <s-button @click="inc">
        <s-icon :name="Add"></s-icon>
      </s-button>
      <s-button @click="dec">
        <s-icon :name="Subtract"></s-icon>
      </s-button>
    </s-button-group>
  </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SButton from 'salmon-ui/button'
import SButtonGroup from 'salmon-ui/button-group'
import SProgress from 'salmon-ui/progress'
import {
  Add, Subtract
} from '@salmon-ui/icons'

const percentage = ref(0)

const inc = () => {
  if (percentage.value >= 100) return
  percentage.value += 10
}
const dec = () => {
  if (percentage.value <= 0) return
  percentage.value -= 10
}
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
</script>