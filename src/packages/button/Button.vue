<template>
  <button
    :class="[
      'sui-button',
      computedType ? `sui-button--${computedType}` : null,
      computedSize ? `sui-button--${computedSize}` : null,
      computedShape ? `sui-button--${computedShape}` : null,
      disabled ? 'is-disabled' : null,
      loading ? 'is-loading' : null,
      danger ? 'is-danger' : null,
      ghost ? 'is-ghost' : null
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <s-icon v-if="!loading && icon && !affixIcon">
      <component :is="icon"></component>
    </s-icon>
    <slot
      v-if="loading"
      name="loader"
    >
      <s-icon class="rotating loader">
        <loader></loader>
      </s-icon>
    </slot>

    <!-- default label -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>

    <s-icon
      v-if="!loading && icon && affixIcon"
      class="sui-icon--right"
    >
      <component :is="icon"></component>
    </s-icon>
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

    const handleClick = (evt: Event) => {
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
