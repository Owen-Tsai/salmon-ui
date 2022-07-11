<template>
  <i
    class="sui-icon"
    :style="computedStyle"
  >
    <slot>
      <component :is="name"></component>
    </slot>
  </i>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  StyleValue,
  Component,
  PropType
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
    name: {
      type: Object as PropType<Component>,
      default: undefined
    }
  },
  setup(props) {
    const computedStyle = computed(() => {
      const result: StyleValue = {}
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
