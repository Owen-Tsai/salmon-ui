<template>
  <demo name="Icon">
    <div class="container">
      <div class="cell">
        <s-icon :size="56" :name="VuejsFill" />
      </div>
      <div class="cell">
        <s-icon :size="56">
          <angularjs-fill />
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <reactjs />
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <thumb-up />
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <xbox />
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <i-switch />
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <playstation />
        </s-icon>
      </div>
      <div class="cell">
        <s-icon :size="56">
          <heart-fill />
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
  color: currentColor;
}
.cell {
  text-align: center;
}
</style>