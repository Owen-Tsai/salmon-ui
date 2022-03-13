<template>
  <demo name="Icon">
    <div class="container">
      <div class="cell">
        <s-icon :size="56" :name="VuejsFill"></s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <angularjs-fill></angularjs-fill>
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <reactjs></reactjs>
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <thumb-up></thumb-up>
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <xbox></xbox>
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <i-switch></i-switch>
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <playstation></playstation>
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <heart-fill></heart-fill>
        </s-icon>
      </div>
    </div>
  </demo>
</template>

<script lang="ts" setup>
import {
  VuejsFill, AngularjsFill, Reactjs,
  Switch as ISwitch, Xbox, Playstation, HeartFill, ThumbUp,
} from '@salmon-ui/icons'
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  color: #1e293b;
}
.cell {
  text-align: center;
}
</style>