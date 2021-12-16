<template>
  <button
    :class="[
      'sui-button',
      `sui-button--${type}`,
      computedSize ? `sui-button--${computedSize}` : '',
      computedShape ? `sui-button--${shape}` : '',
      disabled ? 'is-disabled' : '',
      loading ? 'is-loading' : '',
      danger ? 'is-danger' : '',
      $slots.prefix || $slots.affix ? 'has-icon' : ''
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <slot name="prefix" v-if="!loading"></slot>
    <slot name="loader" v-if="loading">
      <s-icon class="rotating loader">
        <loader></loader>
      </s-icon>
    </slot>
    <slot></slot>
    <slot name="affix" v-if="!loading"></slot>
  </button>
</template>

<script lang="ts">
import SIcon from '../icon'

import {
  computed,
  defineComponent,
  inject,
  PropType
} from 'vue'

import {
  ButtonSize, _buttonSizes,
  ButtonType, _buttonTypes,
  ButtonShape, _buttonShapes,
  ButtonNativeType, _buttonNativeTypes,
} from './button.type'
import type { IButtonGroupProvider } from '@/packages/button-group/button-group.type'

import { Loader } from '@salmon-ui/icons'

export default defineComponent({
  name: 'SButton',
  components: {
    SIcon,
    Loader
  },
  props: {
    type: {
      type: String as PropType<ButtonType>,
      default: () => 'default',
      validator: (v: string) => _buttonTypes.includes(v)
    },
    nativeType: {
      type: String as PropType<ButtonNativeType>,
      default: () => 'button',
      validator: (v: string) => _buttonNativeTypes.includes(v)
    },
    size: {
      type: String as PropType<ButtonSize>,
      validator: (v: string) => _buttonSizes.includes(v)
    },
    shape: {
      type: String as PropType<ButtonShape>,
      validator: (v: string) => _buttonShapes.includes(v)
    },
    disabled: Boolean,
    loading: Boolean,
    autofocus: Boolean,
    danger: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    // injected
    const buttonGroupProvider: IButtonGroupProvider = inject('buttonGroupProvider', {
      type: 'default',
      size: undefined,
      shape: undefined
    })

    // computed
    const computedSize = computed(() => {
      const size = buttonGroupProvider.size || props.size
      return size === undefined ? '' : size
    })
    const computedType = computed(() =>
      props.type || buttonGroupProvider.type
    )
    const computedShape = computed(() => {
      const shape = buttonGroupProvider.shape || props.shape
      return shape === undefined ? '' : shape
    })

    // methods
    const handleClick = (evt) => {
      ctx.emit('click', evt)
    }

    return {
      computedSize,
      computedType,
      computedShape,
      handleClick
    }
  }
})
</script>
