<template>
  <demo name="Rating">
    <s-rating v-model="score1" readonly show-ratings></s-rating>
    <s-rating v-model="score1"></s-rating>
    <s-rating v-model="score2" allow-half show-ratings formatter="{value} 分"></s-rating>
    <br>
    <s-rating
      v-model="score3"
      :icon="HeartFill"
      active-color="#ef4444"
      allow-half
      :max="10"
      show-ratings
    >
      <span>{{ text }}</span>
    </s-rating>
    <br>
    <s-rating
      v-model="score1" show-ratings
      :formatter="formatter"
    ></s-rating>
  </demo>
</template>

<script lang="ts" setup>
import SRating from 'salmon-ui/rating'
import { ref, computed } from 'vue'
import { HeartFill } from '@salmon-ui/icons'

const score1 = ref(3.4)
const score2 = ref(0)
const score3 = ref(8.6)

const text = computed(() => {
  if (score3.value > 8) {
    return '优秀'
  }
  if (score3.value > 5) {
    return '良好'
  }
  return '普通'
})

const formatter = (val: number) => {
  const texts = ['不满', '较差', '一般', '良好', '满意']
  return texts[Math.floor(val - 1)]
}
</script>

<style lang="scss" scoped>
.sui-rating {
  margin: 4px 8px;
}
</style>