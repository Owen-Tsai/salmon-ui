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
import { oneOf } from 'vue-types'

import {
  computed,
  defineComponent,
  inject
} from 'vue'

import {
  _buttonSizes,
  _buttonShapes,
  _buttonNativeTypes,
  _buttonTypes
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
    type: oneOf(_buttonTypes).def('default'),
    nativeType: oneOf(_buttonNativeTypes).def('button'),
    size: oneOf(_buttonSizes).def('default'),
    shape: oneOf(_buttonShapes).def('default'),
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
      size: 'default',
      shape: 'default'
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
