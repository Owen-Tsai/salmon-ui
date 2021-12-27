<template>
  <button
    :class="[
      'sui-button',
      computedType ? `sui-button--${type}` : '',
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
import { buildProp } from '@/utils/props'

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
    type: buildProp({
      values: _buttonTypes,
      defaultValue: 'default',
    }),
    nativeType: buildProp({
      values: _buttonNativeTypes,
      defaultValue: 'button'
    }),
    size: buildProp({
      values: _buttonSizes,
      defaultValue: 'default'
    }),
    shape: buildProp({
      values: _buttonShapes,
      defaultValue: 'default'
    }),
    disabled: Boolean,
    loading: Boolean,
    autofocus: Boolean,
    danger: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    // injected
    const buttonGroupProvider: IButtonGroupProvider = inject('buttonGroupProvider', {
      type: undefined,
      size: undefined,
      shape: undefined
    })

    // computed
    const computedSize = computed(() => {
      const size = buttonGroupProvider.size || props.size
      return size === 'default' ? null : size
    })
    const computedType = computed(() => {
      const type = buttonGroupProvider.type || props.type
      return type === 'default' ? null : type
    })
    const computedShape = computed(() => {
      const shape = buttonGroupProvider.shape || props.shape
      return shape === 'default' ? null : shape
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
