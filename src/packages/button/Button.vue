<template>
  <button
    :class="[
      'sui-button',
      `sui-button--${type}`,
      computedSize ? `sui-button--${computedSize}` : '',
      shape ? `sui-button--${shape}` : '',
      disabled ? 'is-disabled' : '',
      loading ? 'is-loading' : '',
      danger ? 'is-danger' : '',
      icon ? 'has-icon' : ''
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"

    @click="handleClick"
  >
    <s-icon :name="icon" v-if="icon && iconPlacement === 'left' && !loading"></s-icon>
    <s-icon class="rotating loader" name="loader" v-if="loading"></s-icon>
    <span v-if="$slots.default" class="sui-button__label"><slot></slot></span>
    <s-icon class="is-right" :name="icon" v-if="icon && iconPlacement === 'right' && !loading"></s-icon>
  </button>
</template>

<script lang="ts">
  import SIcon from '../icon'
  import { computed, defineComponent, inject } from 'vue'

  const _types = [
    'default', 'primary', 'outlined', 'text'
  ]
  const _nativeTypes = [ 'button', 'submit', 'reset' ]
  const _sizes = [ '', 'large', 'small' ]
  const _shapes = [ '', 'round', 'circle' ]

  export default defineComponent({
    name: 'SButton',
    components: {SIcon},
    props: {
      type: {
        type: String,
        default: 'default',
        validator: (v: string) => {
          return _types.includes(v)
        }
      },
      nativeType: {
        type: String,
        default: 'button',
        validator: (v: string) => {
          return _nativeTypes.includes(v)
        }
      },
      size: {
        type: String,
        validator: (v: string) => {
          return _sizes.includes(v)
        }
      },
      shape: {
        type: String,
        validator: (v: string) => {
          return _shapes.includes(v)
        }
      },
      icon: String,
      iconPlacement: {
        type: String,
        default: 'left',
        validator: (v: string) => {
          return ['left', 'right'].includes(v)
        }
      },
      disabled: Boolean,
      loading: Boolean,
      autofocus: Boolean,
      danger: Boolean
    },
    emits: ['click'],
    setup(props, ctx) {
      // injected
      const buttonGroupSize: any = inject('buttonGroupSize', {})

      // computed
      const computedSize = computed(() => {
        return buttonGroupSize?.value || props.size
      })

      // methods
      const handleClick = (evt) => {
        ctx.emit('click', evt)
      }

      return {
        computedSize,
        handleClick
      }
    }
  })
</script>