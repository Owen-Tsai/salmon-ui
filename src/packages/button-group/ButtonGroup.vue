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

import { buildProp } from '@/utils/props'

import type { IButtonGroupProvider } from './button-group.type'

export default defineComponent({
  name: 'SButtonGroup',
  props: {
    size: buildProp({
      values: _buttonSizes
    }),
    shape: buildProp({
      values: _buttonShapes
    }),
    type: buildProp({
      values: _buttonTypes
    })
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
