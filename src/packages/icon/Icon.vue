<template>
  <i
    class="sui-icon"
    :style="computedStyle"
  >
    <slot></slot>
  </i>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  StyleValue
} from 'vue'

export default defineComponent({
  name: 'SIcon',
  props: {
    color: {
      type: String,
      default: undefined
    },
    size: {
      type: Number,
      default: undefined
    },
  },
  setup(props) {
    const computedStyle = computed(() => {
      let result: StyleValue = {}
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
