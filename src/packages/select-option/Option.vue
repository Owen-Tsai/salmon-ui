<template>
  <li
    v-show="isFilterable ? !isHidden : true"
    :class="[
      'sui-select__option',
      isDisabled ? 'is-disabled' : '',
      divided ? 'is-divided': '',
      isSelected ? 'is-selected' : ''
    ]"
    @click="onClick"
  >
    <span ref="labelSpanEl">
      <slot>{{ renderedLabel }}</slot>
    </span>
    <s-icon
      v-if="isMultipleSelect"
      v-show="isSelected"
      class="sui-option__check-icon"
    >
      <check></check>
    </s-icon>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Check } from '@salmon-ui/icons'
import SIcon from '../icon'

import {
  props,
  useOption
} from './option'

export default defineComponent({
  name: 'SOption',
  components: {
    SIcon,
    Check
  },
  props,
  emits: ['click'],
  setup(props, ctx) {
    const {
      isDisabled,
      isFilterable,
      isHidden,
      isSelected,
      isMultipleSelect,
      changeVisibility,
      onClick,
      renderedLabel
    } = useOption(props, ctx)

    return {
      isDisabled,
      isFilterable,
      isHidden,
      isMultipleSelect,
      isSelected,
      changeVisibility,
      onClick,
      renderedLabel
    }
  }
})
</script>
