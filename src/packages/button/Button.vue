<template>
  <button
    :class="[
      'sui-button',
      computedType ? `sui-button--${computedType}` : '',
      computedSize ? `sui-button--${computedSize}` : '',
      computedShape ? `sui-button--${computedShape}` : '',
      disabled ? 'is-disabled' : '',
      loading ? 'is-loading' : '',
      danger ? 'is-danger' : ''
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
import props from './props'

import {
  computed,
  defineComponent,
  inject
} from 'vue'

import type { ButtonGroupProps } from '@/packages/button-group/props'

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
