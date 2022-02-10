<template>
  <button
    :class="[
      'sui-button',
      computedType ? `sui-button--${computedType}` : null,
      computedSize ? `sui-button--${computedSize}` : null,
      computedShape ? `sui-button--${computedShape}` : null,
      disabled ? 'is-disabled' : null,
      loading ? 'is-loading' : null,
      danger ? 'is-danger' : null
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
    :type="nativeType"
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
import props from './button'

import {
  computed,
  defineComponent,
  inject
} from 'vue'

import type { ButtonGroupProps } from '@/packages/button-group/button-group'

import { Loader } from '@salmon-ui/icons'

export default defineComponent({
  name: 'SButton',
  components: {
    SIcon,
    Loader
  },
  props: props,
  emits: ['click'],
  setup(props, ctx) {
    // injected
    const buttonGroupProvider: ButtonGroupProps = inject(
      'buttonGroupContext',
      undefined as ButtonGroupProps
    )

    // computed
    const computedSize = computed(() => {
      return buttonGroupProvider?.size || props.size
    })
    const computedType = computed(() => {
      return buttonGroupProvider?.type || props.type
    })
    const computedShape = computed(() => {
      return buttonGroupProvider?.shape || props.shape
    })

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
