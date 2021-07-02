<template>
  <div
    class="sui-radio-group"
    ref="radioGroup"
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
    nextTick,
    PropType
  } from 'vue'

  type RadioButtonSize = '' | 'small' | 'large'

  export default defineComponent({
    name: 'SRadioGroup',
    props: {
      modelValue: [String, Number, Boolean],
      disabled: Boolean,
      size: {
        type: String as PropType<RadioButtonSize>,
        default: ''
      }
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
        name: 'radioGroup'
      }))

    }
  })
</script>
