<template>
  <li
    class="sui-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'is-divided': divided,
      'is-danger': danger
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? undefined : -1"
    @click="handleClick"
  >
    <slot></slot>
  </li>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  inject,
  Ref
} from 'vue'

import { Instance } from 'tippy.js'

export default defineComponent({
  name: 'SDropdownItem',
  props: {
    command: {
      type: [String, Number, Object],
      default: () => ({})
    },
    disabled: Boolean,
    divided: Boolean,
    danger: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    // injected
    type DropdownContext = {
      popperInstance: Ref<Instance>,
      commandHandler: (...args: unknown[]) => void
    }
    const dropdown: DropdownContext = inject(
      'dropdown', {} as DropdownContext
    )

    const instance = getCurrentInstance()

    const handleClick = (evt: Event) => {
      if (props.disabled) return
      dropdown.popperInstance.value.hide()
      dropdown.commandHandler?.(props.command, instance, evt)
      ctx.emit('click', evt)
    }

    return {
      handleClick
    }
  }
})
</script>
