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
    <s-button :icon="Heart">
      爱你
    </s-button>
    <br>
    <s-button shape="circle" size="small">
      <s-icon>
        <heart></heart>
      </s-icon>
    </s-button>
    <s-button shape="circle">
      <s-icon>
        <heart></heart>
      </s-icon>
    </s-button>
    <s-button shape="circle" size="large">
      <s-icon>
        <heart></heart>
      </s-icon>
    </s-button>
    <s-button shape="circle" loading></s-button>
    <s-button type="primary">
      爱你
      <s-icon>
        <heart></heart>
      </s-icon>
    </s-button>
    <s-button type="primary" :icon="Heart" affix-icon>
      好评
    </s-button>
    <div class="colored">
      <s-button ghost type="primary">幽灵按钮</s-button>
      <s-button ghost type="outlined">幽灵按钮</s-button>
      <s-button ghost shape="rounded">幽灵按钮</s-button>
      <s-button ghost type="text" shape="rounded">幽灵按钮</s-button>
    </div>
    <s-button disabled>禁用</s-button>
    <s-button loading>加载中</s-button>
    <s-button loading type="primary">加载中</s-button>
  </demo>
</template>

<script lang="ts" setup>
import SButton from 'salmon-ui/button'
import { Heart } from '@salmon-ui/icons'
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