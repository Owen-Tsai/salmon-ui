<template>
  <div
    class="sui-radio-group"
    ref="radioGroupEl"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  toRefs,
  reactive,
  nextTick
} from 'vue'

import props from './radio-group'
import type { Model } from '@/packages/radio/radio'

import { generateId } from '@/utils/utils'

export default defineComponent({
  name: 'SRadioGroup',
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    // methods
    const changeEvent = (val: Model) => {
      ctx.emit('update:modelValue', val)
      nextTick(() => {
        ctx.emit('change', val)
      })
    }

    const id = generateId()

    provide('radioGroupContext', reactive({
      ...toRefs(props),
      name: `radio-group-${id}`,
      group: 'radio-group',
      changeEvent,
    }))

  }
})
</script>
