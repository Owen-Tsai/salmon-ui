<template>
  <button
    :class="[
      'sui-button',
      `sui-button--${type}`,
      computedSize ? `sui-button--${computedSize}` : '',
      shape ? `sui-button--${shape}` : '',
      disabled ? 'is-disabled' : '',
      loading ? 'is-loading' : '',
      danger ? 'is-danger' : ''
    ]"
    :disabled="computedDisabled || loading"
    :autofocus="autofocus"

    @click="handleClick"
  >
    <s-icon :name="icon" v-if="icon && iconPlacement === 'left' && !loading"></s-icon>
    <s-icon name="loader" v-if="loading"></s-icon>
    <span v-if="$slots.default"><slot></slot></span>
    <s-icon :name="icon" v-if="icon && iconPlacement === 'right' && !loading"></s-icon>
  </button>
</template>

<script>
  import SIcon from '../icon/Icon'
  import { computed } from 'vue'

  const _types = [
    'default', 'primary', 'outlined', 'text'
  ]
  const _nativeTypes = [ 'button', 'submit', 'reset' ]
  const _sizes = [ '', 'large', 'small' ]
  const _shapes = [ '', 'round', 'circle' ]

  export default {
    name: 'SButton',
    components: {SIcon},
    props: {
      type: {
        type: String,
        default: 'default',
        validator: (v) => {
          return _types.includes(v)
        }
      },
      nativeType: {
        type: String,
        default: 'button',
        validator: (v) => {
          return _nativeTypes.includes(v)
        }
      },
      size: {
        type: String,
        validator: (v) => {
          return _sizes.includes(v)
        }
      },
      shape: {
        type: String,
        validator: (v) => {
          return _shapes.includes(v)
        }
      },
      icon: String,
      iconPlacement: {
        type: String,
        default: 'left',
        validator: (v) => {
          ['left', 'right'].includes(v)
        }
      },
      disabled: Boolean,
      loading: Boolean,
      autofocus: Boolean,
      danger: Boolean
    },
    emits: ['click'],
    setup(props, ctx) {
      // computed
      // TODO: provide button-group and form context for these 2 computed properties
      const computedSize = computed(() => {
        return props.size
      })
      const computedDisabled = computed(() => {
        return props.disabled
      })

      // methods
      const handleClick = (evt) => {
        ctx.emit('click', evt)
      }

      return {
        computedSize,
        computedDisabled,
        handleClick
      }
    }
  }
</script>
