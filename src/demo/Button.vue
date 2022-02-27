<template>
  <demo name="Button">
    <s-button type="primary">主要按钮</s-button>
    <div class="colored">
      <s-button type="ghost">幽灵按钮</s-button>
    </div>
  </demo>
</template>

<script lang="ts">
import SButton from 'salmon-ui/button'
import Demo from '@/demo/components/Demo.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SButton,
    Demo
  }
})
</script>

<style lang="stylus" scoped>
.colored {
  background-color: #6366F1
  padding: 16px
  margin: 4px
}
</style>