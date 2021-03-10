<template>
  <li
    class="sui-dropdown-menu__item"
    :class="{
      'is-disabled': disabled,
      'is-divided': divided
    }"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    @click="handleClick"
  >
    <s-icon class="sui-dropdown-menu__item__icon" :name="icon" v-if="icon"></s-icon>
    <slot></slot>
  </li>
</template>
<script lang="ts">
  import {
    defineComponent, getCurrentInstance,
    inject
  } from 'vue'
  import SIcon from '../icon'

  export default defineComponent({
    components: { SIcon },
    name: 'SDropdownItem',
    props: {
      command: {
        type: [String, Number, Object],
        default: () => ({})
      },
      disabled: Boolean,
      divided: Boolean,
      icon: String
    },
    emits: ['click'],
    setup(props, ctx) {
      // injected
      const dropdownInstance: any = inject('dropdown', {})

      const instance = getCurrentInstance()

      const handleClick = (evt) => {
        if(props.disabled) return
        if(dropdownInstance.hideOnClick?.value) {
          dropdownInstance.handleClick()
        }
        dropdownInstance.commandHandler?.(props.command, instance, evt)
        ctx.emit('click', evt)
      }

      return {
        handleClick
      }
    }
  })
</script>
