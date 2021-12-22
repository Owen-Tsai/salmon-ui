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

import {
  _buttonShapes,
  _buttonSizes,
  _buttonTypes
} from '@/packages/button/button.type'

import { oneOf } from 'vue-types'

import type { IButtonGroupProvider } from './button-group.type'

export default defineComponent({
  name: 'SButtonGroup',
  props: {
    size: oneOf(_buttonSizes).def('default'),
    shape: oneOf(_buttonShapes).def('default'),
    type: oneOf(_buttonTypes).def('default')
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
