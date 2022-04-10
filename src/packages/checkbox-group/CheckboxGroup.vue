<template>
  <div
    class="sui-checkbox-group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  nextTick,
  toRefs,
  reactive
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
    const changeEvent = (val: Model) => {
      ctx.emit('update:modelValue', val)
      nextTick(() => {
        ctx.emit('change', val)
      })
    }

    const id = generateId()

    provide('checkboxGroup', reactive({
      ...toRefs(props),
      name: `checkbox-group-${id}`,
      group: 'checkbox-group',
      changeEvent
    }))
  }
})
</script>
