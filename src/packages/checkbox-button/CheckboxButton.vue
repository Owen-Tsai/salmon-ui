<template>
  <label
    :class="[
      'sui-checkbox-button',
      size ? `sui-checkbox-button--${size}` : null,
      {
        'is-active': isChecked,
        'is-focused': focus,
        'is-disabled': isDisabled
      }
    ]"
    :aria-disabled="isDisabled"
    :aria-checked="isChecked"
  >
    <input
      v-if="checkedValue || uncheckedValue"
      ref="checkboxRef"
      v-model="model"
      class="sui-checkbox-button__input"
      type="checkbox"
      :checked="isChecked"
      :name="computedName"
      :disabled="isDisabled"
      :true-value="checkedValue"
      :false-value="uncheckedValue"
      @change="handleChange"
      @focus="onFocus"
      @blur="onBlur"
    >
    <input
      v-else
      ref="checkboxRef"
      v-model="model"
      class="sui-checkbox-button__input"
      type="checkbox"
      :checked="isChecked"
      :name="computedName"
      :value="value"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="onFocus"
      @blur="onBlur"
    >
    <span class="sui-checkbox-button__rect">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCheckbox } from 'salmon-ui/checkbox/checkbox'
import {
  props
} from 'salmon-ui/checkbox/checkbox'

export default defineComponent({
  name: 'SCheckboxButton',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const {
      model,
      computedName,
      isGroup,
      isChecked,
      isDisabled,
      handleChange,
      size,
      focus,
      onBlur,
      onFocus
    } = useCheckbox(props, emit)

    return {
      model,
      focus,
      computedName,
      isGroup,
      isChecked,
      isDisabled,
      handleChange,
      size,
      onBlur,
      onFocus
    }
  }
})
</script>
