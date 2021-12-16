<template>
  <span
    :class="[
      'sui-tag',
      `sui-tag--${type}`,
      outlined ? 'is-outlined' : null,
      rounded ? 'is-rounded' : null
    ]"
    @click="handleClick"
  >
    <slot></slot>

    <s-icon
      v-if="dismissible"
      class="sui-tag__close-token"
      @click="handleClose"
    >
      <close></close>
    </s-icon>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SIcon from '../icon'
import {
  Close
} from '@salmon-ui/icons'

const _types = [
  'default', 'success', 'warning', 'error'
]

export default defineComponent({
  name: 'STag',
  components: {SIcon, Close},
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (v: string) => {
        return _types.includes(v)
      }
    },
    outlined: Boolean,
    rounded: Boolean,
    dismissible: Boolean
  },
  emits: ['click', 'close'],
  setup(props, ctx) {
    const handleClick = (evt) => {
      ctx.emit('click', evt)
    }
    const handleClose = (evt) => {
      ctx.emit('close', evt)
    }

    return {
      handleClick, handleClose
    }
  }
})
</script>
