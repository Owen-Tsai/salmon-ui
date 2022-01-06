<template>
  <label
    :class="[
      'sui-radio-button',
      size ? `sui-radio-button--${size}` : null,
      {
        'is-active': model === value,
        'is-disabled': isDisabled,
        'is-focused': isFocused
      }
    ]"
    :aria-checked="model === value"
    :aria-disabled="isDisabled"
  >
    <input
      class="sui-radio-button__original"
      ref="inputEl"
      type="radio"
      v-model="model"
      :value="value" :name="computedName"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <span class="sui-radio-button__btn">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

import props from './props'
import { useRadioButton } from './use-radio-button'

export default defineComponent({
  name: 'SRadioButton',
  props,
  setup(props, { emit }) {
    const isFocused = ref(false)

    const {
      isDisabled,
      model,
      handleChange,
      size,
      computedName,
      tabindex
    } = useRadioButton(props, emit)

    return {
      model,
      tabindex,
      size,
      computedName,
      isDisabled,
      isFocused,
      handleChange
    }
  }
})
</script>
