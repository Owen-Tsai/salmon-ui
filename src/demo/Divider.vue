<template>
  <demo name="Divider">
    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
    <s-divider />
    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
    <s-divider :margin="10" />
    <div>
      <span>Item 1</span>
      <s-divider direction="vertical" />
      <span>Item 2</span>
      <s-divider direction="vertical" />
      <span>Item 3</span>
    </div>
    <s-divider margin="large" />
    <div>
      <span>Item 1</span>
      <s-divider margin="small" direction="vertical" />
      <span>Item 2</span>
      <s-divider margin="small" direction="vertical" />
      <span>Item 3</span>
    </div>
    <div style="margin-top: 24px;">
      <div class="list-item">
        <s-avatar :size="64" shape="circle">
          <s-icon :size="24" :name="Image"></s-icon>
        </s-avatar>
        <div class="text">
          <b>Item Title</b>
          <p>Feb 12, 2023</p>
        </div>
      </div>

      <s-divider class="divider" margin="small" />

      <div class="list-item">
        <s-avatar :size="64" shape="circle">
          <s-icon :size="24" :name="Image"></s-icon>
        </s-avatar>
        <div class="text">
          <b>Item Title</b>
          <p>Feb 12, 2023</p>
        </div>
      </div>

      <s-divider class="divider" margin="small" />
    </div>
  </demo>
</template>

<script lang="ts" setup>
import SDivider from 'salmon-ui/divider'
import SAvatar from 'salmon-ui/avatar'
import SIcon from 'salmon-ui/icon'
import {
  Image
} from '@salmon-ui/icons'
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  align-items: center;

  .text {
    margin-left: 24px;
  }

  p {
    margin: 0;
    color: var(--sui-text-3);
    font-size: 14px;
    margin-top: 4px;
    margin-bottom: 8px;
  }
  b {
    font-size: 18px;
    color: var(--sui-text-1);
  }
}

.divider {
  width: calc(100% - 84px) !important;
  left: 84px;
}
</style>
