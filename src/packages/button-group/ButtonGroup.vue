<template>
  <div class="sui-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  provide,
  reactive
} from 'vue'

  import type {
    ButtonSize,
    ButtonShape,
    ButtonType
  } from '@/packages/button/button.type'
  import type { IButtonGroupProvider } from './button-group.type'

  export default defineComponent({
    name: 'SButtonGroup',
    props: {
      size: {
        type: String as PropType<ButtonSize>,
      },
      shape: {
        type: String as PropType<ButtonShape>,
      },
      type: {
        type: String as PropType<ButtonType>,
        default: 'default'
      }
    },
    setup(props) {
      const provided = reactive({
        size: props.size,
        shape: props.shape,
        type: props.type
      } as IButtonGroupProvider)

      provide('buttonGroupProvider', provided)
    }
  })
</script>
