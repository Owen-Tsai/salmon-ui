<template>
  <demo name="Avatar">
    <s-avatar :src="img" />
    <s-avatar :src="img3" />
    <s-avatar>User</s-avatar>
    <s-avatar>
      <s-icon :size="24"><user-fill /></s-icon>
    </s-avatar>
    <br>
    <s-avatar shape="circle" :src="img3" />
    <s-avatar shape="circle" auto-font-size>张三</s-avatar>
    <s-avatar shape="circle" auto-font-size>{{ text }}</s-avatar>
    <s-avatar shape="circle" auto-font-size>M</s-avatar>
    <br>
    <s-avatar size="large" :src="img" />
    <s-avatar size="large" shape="circle" :src="img3" />
    <s-avatar size="small" shape="circle" :src="img" />
    <s-avatar size="small" :src="img3" />
    <br>
    <s-avatar :size="56" shape="circle" :src="img" />
    <s-avatar :size="56" :src="img3" />
  </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SAvatar from 'salmon-ui/avatar'
import img from '@/assets/avatar.jpg'
import img3 from '@/assets/avatar2.jpg'
import { UserFill } from '@salmon-ui/icons'

const text = ref('')

setTimeout(() => {
  text.value = '名字很长'
}, 2000)
</script>

<style scoped>
.sui-avatar {
  margin: 8px;
}
</style>