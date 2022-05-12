<template>
  <div
    class="sui-button-group"
    @keydown.left.stop.prevent="focusPrevButton"
    @keydown.right.stop.prevent="focusNextButton"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  defineComponent,
  provide,
  ref,
  computed
} from 'vue'

import props from './button-group'

export default defineComponent({
  name: 'SButtonGroup',
  props: props,
  setup(props) {
    const buttons = ref<ComponentInternalInstance[]>([])

    const focused = ref<ComponentInternalInstance>()

    const onCreated = (button: ComponentInternalInstance) => {
      buttons.value.push(button)
    }

    const focusedIndex = computed(() => {
      if (!focused.value) return -1
      return buttons.value.findIndex(e => e === focused.value)
    })

    const focusPrevButton = () => {
      if (focusedIndex.value <= 0) return
      (buttons.value[focusedIndex.value - 1].vnode.el as HTMLButtonElement).focus()
    }

    const focusNextButton = () => {
      if (focusedIndex.value >= buttons.value.length - 1) return
      (buttons.value[focusedIndex.value + 1].vnode.el as HTMLButtonElement).focus()
    }

    provide('buttonGroupContext', {
      size: props.size,
      shape: props.shape,
      type: props.type,
      onCreated,
      focused
    })

    return {
      focusPrevButton,
      focusNextButton
    }
  }
})
</script>
