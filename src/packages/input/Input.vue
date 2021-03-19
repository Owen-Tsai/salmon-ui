<template>
  <div
    :class="[
      type === 'textarea' ? 'sui-textarea' : 'sui-input',
      size ? `sui-input--${size}` : ''
    ]"
  >

  </div>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  const _sizes = ['large', '', 'small']

  export default defineComponent({
    name: 'SInput',
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
        validator: (v: string) => {
          return _sizes.includes(v)
        },
      },

    }
  })
</script>
