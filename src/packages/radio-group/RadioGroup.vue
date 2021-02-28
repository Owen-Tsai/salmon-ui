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
    ref, toRefs, reactive,
    onMounted,
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
      // states
      const radioGroup = ref(null)

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

      onMounted(() => {
        const radios = radioGroup.value.querySelectorAll('[type=radio]')
        const firstEl = radios[0]
        if (!Array.from(radios).some((radio) => radio.checked) && firstEl) {
          firstEl.tabIndex = 0
        }
      })

      return {
        radioGroup
      }
    }
  })
</script>
