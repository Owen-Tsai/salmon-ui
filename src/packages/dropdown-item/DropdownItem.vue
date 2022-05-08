<template>
  <li
    class="sui-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'is-divided': divided,
      'is-danger': danger,
      'is-highlighted': highlighted
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? undefined : -1"
    @click="handleClick"
    @mouseover="handleMouseEnter"
  >
    <slot></slot>
  </li>
</template>
<script lang="ts">
import {
  ComponentInternalInstance,
  defineComponent,
  getCurrentInstance,
  inject,
  ref
} from 'vue'

import {
  IDropdownContext,
  ItemProxy
} from './dropdown-item'

export default defineComponent({
  name: 'SDropdownItem',
  props: {
    command: {
      type: String,
      default: undefined
    },
    disabled: Boolean,
    divided: Boolean,
    danger: Boolean
  },
  emits: ['click'],
  setup(props, ctx) {
    // injected
    const dropdown: IDropdownContext = inject(
      'dropdown', {} as IDropdownContext
    )
    const highlighted = ref(false)

    const instance = getCurrentInstance() as ComponentInternalInstance

    dropdown.onItemCreated(instance.proxy as unknown as ItemProxy)

    const handleClick = () => {
      if (props.disabled) return
      if (props.command) {
        dropdown.commandHandler(props.command)
      }
      dropdown.popper.value.hide()
      ctx.emit('click')
    }

    const handleMouseEnter = () => {
      if (props.disabled) return
      dropdown.setHighlightedItem(instance.proxy as unknown as ItemProxy)
    }

    return {
      highlighted,
      handleClick,
      handleMouseEnter
    }
  }
})
</script>
