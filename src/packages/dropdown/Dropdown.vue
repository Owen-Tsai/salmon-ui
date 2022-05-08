<template>
  <div
    class="sui-dropdown"
    @keydown.down.prevent="navigateMenuItem('down')"
    @keydown.up.prevent="navigateMenuItem('up')"
    @keydown.enter.prevent="handleEnterPressed"
    @keydown.esc.stop.prevent="closeMenu"
    @keydown.tab="closeMenu"
  >
    <div
      ref="referenceEl"
      class="sui-dropdown__reference"
    >
      <slot name="reference"></slot>
    </div>
    <div
      ref="popperEl"
      class="sui-dropdown__popper"
      :style="computedStyle"
      @mouseout="clearHighlightState"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide
} from 'vue'

import {
  props,
  useDropdown
} from './dropdown'

export default defineComponent({
  name: 'SDropdown',
  props,
  emits: ['before-hide', 'before-show', 'after-hide', 'after-show', 'command'],
  setup(props, { emit }) {
    const commandHandler = (...args: unknown[]) => {
      emit('command', ...args)
    }

    const {
      clearHighlightState,
      closeMenu,
      computedStyle,
      onItemCreated,
      navigateMenuItem,
      handleEnterPressed,
      setHighlightedItem,
      referenceEl,
      popperEl,
      popper
    } = useDropdown(props, emit)

    // provide
    provide('dropdown', {
      onItemCreated,
      setHighlightedItem,
      commandHandler,
      popper
    })

    return {
      referenceEl,
      popperEl,
      popper,

      commandHandler,
      computedStyle,
      navigateMenuItem,
      clearHighlightState,
      handleEnterPressed,
      closeMenu
    }
  }
})
</script>
