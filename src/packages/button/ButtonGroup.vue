<template>
  <div class="sui-button-group">
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent, provide, ref } from 'vue'

  const _sizes = ['', 'large', 'small']

  export default defineComponent({
    name: 'SButtonGroup',
    props: {
      size: {
        type: String,
        validator: (v) => {
          return _sizes.includes(v)
        }
      }
    },
    setup(props) {
      const buttonSizes = ref(props.size)

      provide('buttonGroupSize', buttonSizes)
    }
  })
</script>
