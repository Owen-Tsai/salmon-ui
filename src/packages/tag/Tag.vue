<template>
  <span
    :class="[
      'sui-tag',
      type ? `sui-tag--${type}` : null,
      fill ? `sui-tag--fill-${fill}` : null,
      size ? `sui-tag--${size}` : null,
      rounded ? 'is-rounded' : null
    ]"
    @click="handleClick"
  >
    <slot></slot>

    <button
      v-if="dismissible"
      class="sui-tag__close-btn"
    >
      <s-icon
        class="sui-tag__close-token"
        @click="handleClose"
      >
        <close></close>
      </s-icon>
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SIcon from '../icon'
import { Close } from '@salmon-ui/icons'

import props from './tag'

export default defineComponent({
  name: 'STag',
  components: {
    SIcon,
    Close
  },
  props,
  emits: ['click', 'close'],
  setup(props, { emit }) {
    const handleClick = (evt: Event) => {
      emit('click', evt)
    }
    const handleClose = (evt: Event) => {
      emit('close', evt)
    }

    return {
      handleClick, handleClose
    }
  }
})
</script>
