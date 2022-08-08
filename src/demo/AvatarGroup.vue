<template>
  <demo name="Avatar Group">
    <s-avatar-group size="large">
      <s-avatar shape="circle" :src="img1" />
      <s-avatar shape="circle" :src="img2" />
      <s-avatar shape="circle" :src="img3" />
    </s-avatar-group>
    <br>
    <s-avatar-group>
      <s-avatar shape="circle" :src="img1" />
      <s-avatar shape="circle" style="background-color: #16a34a; color: #fff">张三</s-avatar>
      <s-avatar shape="circle" style="background-color: #f97316; color: #fff">李四</s-avatar>
      <s-avatar shape="circle" style="background-color: #ec4899; color: #fff">王五</s-avatar>
    </s-avatar-group>
  </demo>
</template>

<script lang="ts" setup>
import SAvatarGroup from 'salmon-ui/avatar-group'
import SAvatar from 'salmon-ui/avatar'
import img1 from '@/assets/avatar.jpg'
import img2 from '@/assets/avatar2.jpg'
import img3 from '@/assets/avatar3.jpg'
</script>
