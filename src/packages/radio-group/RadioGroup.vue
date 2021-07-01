<template>
  <div
    class="sui-radio-group"
    ref="radioGroup"
    role="radiogroup"
  >
    <slot></slot>
  </div>
</template>

<script>
  import {
    defineComponent,
    provide,
    toRefs,
    reactive,
    nextTick
  } from 'vue'

  export default defineComponent({
    name: 'SRadioGroup',
    props: {
      modelValue: [String, Number, Boolean],
      disabled: Boolean,
      name: String
    },
    emits: ['change', 'update:modelValue'],
    setup(props, ctx) {
      // methods
      const changeEvent = val => {
        ctx.emit('update:modelValue', val)
        nextTick(() => {
          ctx.emit('change', val)
        })
      }

      provide('radioGroup', reactive({
        ...toRefs(props),
        changeEvent,
      }))

    }
  })
</script>
