<template>
  <div
    class="sui-dropdown"
    @keydown.down.prevent="onKeyDown('down')"
    @keydown.up.prevent="onKeyDown('up')"
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
      @mouseout="onMouseLeave"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  provide,
  onMounted
} from 'vue'

import {
  props,
  usePopperInstance,
  usePopperOptions,
  useStyles,
  useEvents
} from './dropdown'

export default defineComponent({
  name: 'SDropdown',
  props,
  emits: ['before-hide', 'before-show', 'after-hide', 'after-show', 'command'],
  setup(props, { emit }) {
    const referenceEl = ref<Element>()
    const popperEl = ref<Element>()
    
    const {
      options
    } = usePopperOptions(props)

    const {
      popperInstance,
      createPopper,
      setupWatchers,
      isSubmenuExpanded
    } = usePopperInstance(options, props, emit)

    onMounted(() => {
      createPopper(
        referenceEl.value as HTMLElement,
        popperEl.value as HTMLElement
      )

      if (props.disabled) {
        popperInstance.value?.disable()
      }

      setupWatchers()
    })

    const commandHandler = (...args: unknown[]) => {
      emit('command', ...args)
    }

    const {
      computedStyle
    } = useStyles(props)

    const {
      onItemCreated,
      onKeyDown,
      setHighlightedItem,
      onMouseLeave
    } = useEvents()

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
      isSubmenuExpanded,

      onKeyDown,
      onMouseLeave
    }
  }
})
</script>
