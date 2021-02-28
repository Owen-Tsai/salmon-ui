<template>
  <span
    :class="[
      'sui-tag',
      `sui-tag--${type}`,
      size ? `sui-tag--${size}`: '',
      outlined ? 'is-outlined' : ''
    ]"
    @click="handleClick"
  >
    <slot></slot>

    <s-icon
      v-if="dismissible"
      class="sui-tag__close-token" name="x"
      @click="handleClose"
    ></s-icon>
  </span>
</template>

<script>
  import { defineComponent } from 'vue'
  import SIcon from "../icon/Icon";

  const _types = [
    'default', 'success', 'warning', 'error'
  ]
  const _sizes = [
    '', 'large', 'small'
  ]

  export default defineComponent({
    name: 'STag',
    components: {SIcon},
    props: {
      type: {
        type: String,
        default: 'default',
        validator: (v) => {
          return _types.includes(v)
        }
      },
      size: {
        type: String,
        default: '',
        validator: (v) => {
          return _sizes.includes(v)
        }
      },
      outlined: Boolean,
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
