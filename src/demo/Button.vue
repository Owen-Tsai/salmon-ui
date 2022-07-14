<template>
  <demo name="Button">
    <s-button type="primary">主要按钮</s-button>
    <s-button>默认按钮</s-button>
    <s-button type="outlined">outlined按钮</s-button>
    <s-button type="text">文字按钮</s-button>
    <br>
    <s-button type="primary" danger>危险按钮</s-button>
    <s-button danger>默认危险</s-button>
    <s-button type="outlined" danger>outlined危险</s-button>
    <s-button type="text" danger>危险文字</s-button>
    <br>
    <s-button shape="rounded" size="large">大号按钮</s-button>
    <s-button shape="rounded">中等尺寸</s-button>
    <s-button shape="rounded" size="small">小尺寸</s-button>
    <s-button shape="rounded" size="mini">mini尺寸</s-button>
    <br>
    <s-button :icon="Heart" type="primary">爱你</s-button>
    <s-button :icon="DeleteBin" type="primary">Delete</s-button>
    <s-button :icon="Heart" type="primary"></s-button>
    <s-button :icon="Heart" type="primary" loading></s-button>
    <br>
    <s-button shape="circle" size="mini">
      <template #icon>
        <s-icon :name="Heart" />
      </template>
    </s-button>
    <s-button shape="circle" size="small">
      <template #icon>
        <s-icon :name="Heart" />
      </template>
    </s-button>
    <s-button shape="circle">
      <template #icon>
        <s-icon :name="Heart" />
      </template>
    </s-button>
    <s-button shape="circle" size="large">
      <template #icon>
        <s-icon :name="Heart" />
      </template>
    </s-button>
    <s-button shape="circle" :icon="Heart" loading></s-button>
    <br>
    <s-button disabled>禁用</s-button>
    <s-button type="primary" disabled>Disabled</s-button>
    <s-button type="outlined" disabled>Outlined</s-button>
    <s-button type="text" disabled>Text</s-button>
    <s-button loading>加载中</s-button>
    <s-button loading type="primary">加载中</s-button>
  </demo>
</template>

<script lang="ts" setup>
import SButton from 'salmon-ui/button'
import {
  Heart,
  DeleteBin
} from '@salmon-ui/icons'
</script>

<style scoped>
.colored {
  background-color: #6366F1;
  padding: 8px;
  margin: 4px;
}
.sui-button {
  margin: 8px;
}
</style>