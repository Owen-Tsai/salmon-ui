<template>
  <demo name="Button Group">
    <s-button-group>
      <s-button>按钮1</s-button>
      <s-button>按钮2</s-button>
      <s-button>按钮3</s-button>
    </s-button-group>

    <s-button-group type="primary">
      <s-button>按钮1</s-button>
      <s-button>按钮2</s-button>
      <s-button>按钮3</s-button>
    </s-button-group>

    <br>

    <s-button-group shape="rounded">
      <s-button>按钮1</s-button>
      <s-button>按钮2</s-button>
      <s-button>按钮3</s-button>
    </s-button-group>

    <s-button-group shape="rounded" type="outlined">
      <s-button>按钮1</s-button>
      <s-button>按钮2</s-button>
      <s-button>按钮3</s-button>
    </s-button-group>
  </demo>
</template>

<script lang="ts" setup>
import SButtonGroup from 'salmon-ui/button-group'
import SButton from 'salmon-ui/button'
</script>

<style lang="stylus" scoped>
.sui-button-group {
  margin: 8px
}
</style>