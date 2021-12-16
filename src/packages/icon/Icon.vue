<template>
  <span class="sui-icon" :style="computedStyle">
    <slot></slot>
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from 'vue'

export default defineComponent({
  name: 'SIcon',
  props: {
    color: String,
    size: Number,
  },
  setup(props) {
    const computedStyle = computed(() => {
      let result: Partial<CSSStyleDeclaration> = {}
      if (props.color) {
        result.color = props.color
      }
      if (props.size) {
        result.fontSize = `${props.size}px`
      }

      return result
    })

    return {
      computedStyle
    }
  }
})
</script>
