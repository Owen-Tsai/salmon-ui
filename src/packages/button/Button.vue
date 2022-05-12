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
    @focus="handleFocus"
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
  inject,
  getCurrentInstance,
  ComponentInternalInstance
} from 'vue'

import type { ButtonGroupContext } from '@/packages/button-group/button-group'

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
    const group: ButtonGroupContext = inject(
      'buttonGroupContext',
      undefined as ButtonGroupContext
    )

    // computed
    const computedSize = computed(() => {
      return group?.size || props.size
    })
    const computedType = computed(() => {
      return group?.type || props.type
    })
    const computedShape = computed(() => {
      return group?.shape || props.shape
    })

    const self = getCurrentInstance()

    group?.onCreated(self as ComponentInternalInstance)

    const handleFocus = () => {
      if (group) {
        group.focused.value = self as ComponentInternalInstance
      }
    }

    const handleClick = (evt: Event) => {
      ctx.emit('click', evt)
    }

    return {
      computedSize,
      computedType,
      computedShape,
      handleClick,
      handleFocus
    }
  }
})
</script>
