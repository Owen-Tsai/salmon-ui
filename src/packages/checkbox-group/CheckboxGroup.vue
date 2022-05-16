<template>
  <div
    class="sui-checkbox-group"
    role="group"
    aria-label="checkbox-group"
    @keydown.left.prevent="focusPrev"
    @keydown.right.prevent="focusNext"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  defineComponent,
  provide,
  nextTick,
  toRefs,
  reactive,
  ref,
  computed,
} from 'vue'

import {
  props,
  Model
} from './checkbox-group'
import { generateId } from '@/utils/utils'

export default defineComponent({
  name: 'SCheckboxGroup',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const focused = ref<ComponentInternalInstance>()
    const els = ref<ComponentInternalInstance[]>([])

    const focusedIndex = computed(() => {
      return els.value.findIndex(e => e.uid === focused.value?.uid)
    })

    const focusPrev = () => {
      if (focusedIndex.value <= 0) return
      els.value[focusedIndex.value - 1].proxy?.$el.focus()
    }

    const focusNext = () => {
      if (focusedIndex.value >= els.value.length - 1) return
      els.value[focusedIndex.value + 1].proxy?.$el.focus()
    }

    const onCreate = (el: ComponentInternalInstance) => {
      els.value.push(el)
    }
    
    const onChange = (val: Model) => {
      ctx.emit('update:modelValue', val)
      nextTick(() => {
        ctx.emit('change', val)
      })
    }

    const onFocus = (v: ComponentInternalInstance) => {
      focused.value = v
    }

    const id = generateId()

    provide('checkboxGroup', reactive({
      ...toRefs(props),
      name: props.name || `checkbox-group-${id}`,
      group: 'checkbox-group',
      onFocus,
      onChange,
      onCreate
    }))

    return {
      focusPrev,
      focusNext
    }
  }
})
</script>
