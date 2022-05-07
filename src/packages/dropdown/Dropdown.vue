<template>
  <div
    class="sui-dropdown"
    @keydown.down.prevent="navigateMenuItem('down')"
    @keydown.up.prevent="navigateMenuItem('up')"
    @keydown.enter="selectItem"
    @keydown.esc.stop.prevent="closeMenu"
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
      selectItem,
      setHighlightedItem,
      referenceEl,
      popperEl
    } = useDropdown(props, emit)

    // provide
    provide('dropdown', {
      onItemCreated,
      setHighlightedItem, 
      commandHandler
    })

    return {
      referenceEl,
      popperEl,

      commandHandler,
      computedStyle,
      navigateMenuItem,
      clearHighlightState,
      selectItem,
      closeMenu
    }
  }
})
</script>
