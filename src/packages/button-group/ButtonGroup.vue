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

import {
  _buttonShapes,
  _buttonSizes,
  _buttonTypes
} from '@/packages/button/button.type'

import type { IButtonGroupProvider } from './button-group.type'

export default defineComponent({
  name: 'SButtonGroup',
  props: {
    size: {
      type: String as PropType<ButtonSize>,
      validator: (v: string) => _buttonSizes.includes(v)
    },
    shape: {
      type: String as PropType<ButtonShape>,
      validator: (v: string) => _buttonShapes.includes(v)
    },
    type: {
      type: String as PropType<ButtonType>,
      default: 'default',
      validator: (v: string) => _buttonTypes.includes(v)
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
