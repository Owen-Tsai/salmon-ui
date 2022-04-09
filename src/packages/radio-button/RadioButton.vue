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
    :tabindex="tabIndex"
  >
    <input
      ref="inputEl"
      v-model="model"
      class="sui-radio-button__input"
      type="radio"
      :value="value"
      :name="computedName"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <span class="sui-radio-button__rect">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'

import {
  props,
  useRadioButton
} from './radio-button'

export default defineComponent({
  name: 'SRadioButton',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isFocused = ref(false)

    const {
      isDisabled,
      model,
      handleChange,
      size,
      computedName,
      tabIndex
    } = useRadioButton(props, emit)

    return {
      model,
      tabIndex,
      size,
      computedName,
      isDisabled,
      isFocused,
      handleChange
    }
  }
})
</script>
