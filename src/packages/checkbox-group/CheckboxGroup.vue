<template>
  <div class="sui-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    provide,
    computed,
    nextTick,
    toRefs,
    reactive
  } from 'vue'

  import { generateId } from '@/utils/utils'

  export default defineComponent({
    name: 'SCheckboxGroup',
    props: {
      modelValue: [ Object, Boolean, Array ],
      disabled: Boolean,
      name: {
        type: String,
        default: () => `checkbox-group-${generateId()}`
      },
      min: Number,
      max: Number
    },
    emits: ['update:modelValue', 'change'],
    setup(props, ctx) {
      const changeEvent = val => {
        ctx.emit('update:modelValue', val)
        nextTick(() => {
          ctx.emit('change', val)
        })
      }

      const model = computed({
        get() {
          return props.modelValue
        },
        set(val) {
          changeEvent(val)
        },
      })

      provide('checkboxGroup', reactive({
        changeEvent,
        model,
        group: 'checkboxGroup',
        ...toRefs(props)
      }))
    }
  })
</script>
