<template>
  <div
    class="sui-input"
    :class="{

    }"
  >

  </div>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  const _sizes = ['small', '', 'large']

  export default defineComponent({
    name: 'SInput',
    inheritAttrs: false,
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      size: {
        type: String,
        default: '',
        validator: (v: string) => {
          return _sizes.includes(v)
        }
      },
      disabled: Boolean,
      readonly: Boolean,
      showPasswordToggle: Boolean,
      clearable: Boolean,
      showWordCount: Boolean,
      autocomplete: {
        type: String,
        default: 'off',
        validator: (v:string) => ['on', 'off'].includes(v)
      },
      tabindex: String,
      label: String,
      placeholder: String,
      prefixIcon: String,
      suffixIcon: String,
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(props, ctx) {

    }
  })
</script>
