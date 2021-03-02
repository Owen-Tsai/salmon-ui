<template>
  <div class="sui-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
  import {
    defineComponent,
    provide,
    computed,
    nextTick,
    toRefs,
  } from 'vue'

  export default defineComponent({
    name: 'SCheckboxGroup',
    props: {
      modelValue: [ Object, Boolean, Array ],
      disabled: Boolean,
      name: String,
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

      const modelValue = computed({
        get() {
          return props.modelValue
        },
        set(val) {
          changeEvent(val)
        },
      })

      provide('checkboxGroup', {
        changeEvent,
        modelValue,
        ...toRefs(props)
      })
    }
  })
</script>
