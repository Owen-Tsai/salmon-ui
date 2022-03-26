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
  inject
} from 'vue'

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
    const dropdownInstance: any = inject('dropdown', {})

    const instance = getCurrentInstance()

    const handleClick = (evt: Event) => {
      if (props.disabled) return
      dropdownInstance.handleClick()
      dropdownInstance.commandHandler?.(props.command, instance, evt)
      ctx.emit('click', evt)
    }

    return {
      handleClick
    }
  }
})
</script>
