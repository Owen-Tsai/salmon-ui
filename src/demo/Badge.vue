<template>
  <demo name="Badge">
    <s-badge :value="value" :dot-style="{ padding: 0 }">
      <s-avatar :src="img"></s-avatar>
      <template #content>
        <s-icon :name="Time" />
      </template>
    </s-badge>
    <s-badge :max="9" :value="value" type="error">
      <s-avatar :src="img2"></s-avatar>
    </s-badge>
    <s-badge :max="12" :value="value" type="warning">
      <s-avatar :src="img"></s-avatar>
    </s-badge>
    <s-badge dot type="error">
      <s-avatar :src="img"></s-avatar>
    </s-badge>
    <s-badge value="VIP" type="error">
      <s-button>新功能</s-button>
    </s-badge>

    <br>
    <s-button-group>
      <s-button @click="value ++">
        <s-icon><add></add></s-icon>
      </s-button>
      <s-button @click="value --">
        <s-icon><subtract></subtract></s-icon>
      </s-button>
    </s-button-group>
  </demo>
</template>

<script lang="ts" setup>
import SBadge from 'salmon-ui/badge'
import SAvatar from 'salmon-ui/avatar'
import SButton from 'salmon-ui/button'
import SIcon from 'salmon-ui/icon'
import SButtonGroup from 'salmon-ui/button-group'
import img from '@/assets/avatar3.jpg'
import img2 from '@/assets/avatar2.jpg'
import { Add, Subtract, Time } from '@salmon-ui/icons'
import { ref } from 'vue'

const value = ref(1)
</script>

<style scoped>
.sui-badge {
  margin: 8px;
}
.sui-button-group {
  margin: 8px;
}
</style>