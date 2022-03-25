<template>
  <div
    v-if="!submenu"
    class="sui-dropdown"
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
    >
      <slot></slot>
    </div>
  </div>

  <li
    v-else
    ref="referenceEl"
    class="sui-dropdown sui-dropdown-menu__item sui-dropdown-submenu"
  >
    <div
      ref="referenceEl"
      class="sui-dropdown__reference"
    >
      <slot name="reference"></slot>
      <s-icon
        :class="[
          'submenu-arrow',
          isSubmenuExpanded ? 'rotate--180' : null
        ]"
        :name="ArrowRightS"
      >
      </s-icon>
    </div>
    <div
      ref="popperEl"
      class="sui-dropdown__popper"
      :style="computedStyle"
    >
      <slot></slot>
    </div>
  </li>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  provide,
  getCurrentInstance,
  onMounted,
} from 'vue'

import SIcon from 'salmon-ui/icon'
import { ArrowRightS } from '@salmon-ui/icons'

import {
  props,
  usePopperInstance,
  usePopperOptions,
  useStyles
} from './dropdown'

export default defineComponent({
  name: 'SDropdown',
  components: {
    SIcon
  },
  props,
  emits: ['before-hide', 'before-show', 'after-hide', 'after-show', 'command'],
  setup(props, { emit }) {
    const referenceEl = ref<Element>()
    const popperEl = ref<Element>()
    const instance = getCurrentInstance()
    
    const {
      options,
      isSubmenuExpanded
    } = usePopperOptions(props, emit)

    const {
      popperInstance,
      createPopper,
      setupWatchers
    } = usePopperInstance(options, props)

    onMounted(() => {
      createPopper(
        referenceEl.value as Element,
        popperEl.value as Element
      )

      if (props.disabled) {
        popperInstance.value?.disable()
      }

      setupWatchers()
    })

    const commandHandler = (...args: any) => {
      emit('command', ...args)
    }

    const handleClick = () => {
      popperInstance.value?.hide()
    }

    const {
      computedStyle
    } = useStyles(props)

    // provide
    provide('dropdown', {
      instance,
      handleClick,
      commandHandler
    })

    return {
      referenceEl,
      popperEl,
      commandHandler,
      handleClick,
      computedStyle,
      isSubmenuExpanded,
      ArrowRightS
    }
  }
})
</script>
