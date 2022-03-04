<template>
  <demo name="Avatar">
    <s-avatar :src="img"></s-avatar>
    <s-avatar :src="img2"></s-avatar>
    <s-avatar>User</s-avatar>
    <s-avatar>
      <s-icon :size="32"><user-fill></user-fill></s-icon>
    </s-avatar>
    <s-avatar shape="circle" :src="img"></s-avatar>
    <s-avatar shape="circle" :src="img2"></s-avatar>
    <s-avatar shape="circle">张三</s-avatar>
    <br>
    <s-avatar size="large" :src="img"></s-avatar>
    <s-avatar size="large" shape="circle" :src="img2"></s-avatar>
    <s-avatar size="small" shape="circle" :src="img"></s-avatar>
    <s-avatar size="small" :src="img2"></s-avatar>
    <s-avatar :size="60" shape="circle" :src="img"></s-avatar>
    <s-avatar :size="60" :src="img2"></s-avatar>
  </demo>
</template>

<script lang="ts" setup>
import SAvatar from 'salmon-ui/avatar'
import img from '@/assets/avatar2.jpg'
import img2 from '@/assets/avatar3.jpg'
import { UserFill } from '@salmon-ui/icons'
</script>

<style scoped>
.sui-avatar {
  margin: 8px;
}
</style>