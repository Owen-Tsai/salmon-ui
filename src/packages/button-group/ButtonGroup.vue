<template>
  <div class="sui-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  reactive
} from 'vue'

import props from './button-group'

export default defineComponent({
  name: 'SButtonGroup',
  props: props,
  setup(props) {
    const provided = reactive({
      size: props.size,
      shape: props.shape,
      type: props.type
    })

    provide('buttonGroupContext', provided)
  }
})
</script>
