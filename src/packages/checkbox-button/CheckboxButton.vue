<template>
  <label
    :class="[
      'sui-checkbox-button',
      size ? `sui-checkbox-button--${size}` : null,
      {
        'is-checked': isChecked,
        'is-focused': focus,
        'is-disabled': isDisabled
      }
    ]"
    :aria-disabled="isDisabled"
    :aria-checked="isChecked"
  >
    <input
      v-if="checkedValue || uncheckedValue"
      class="sui-checkbox-button__original"
      type="checkbox"
      ref="checkboxRef"
      v-model="model"
      :checked="isChecked"
      :name="computedName"
      :disabled="isDisabled"
      :true-value="checkedValue"
      :false-value="uncheckedValue"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    >
    <input
      v-else
      class="sui-checkbox-button__original"
      type="checkbox"
      ref="checkboxRef"
      v-model="model"
      :checked="isChecked"
      :name="computedName"
      :value="value"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="focus = true"
      @blur="focus = false"
    >
    <span class="sui-checkbox-button__btn">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useCheckbox } from '@/packages/checkbox/use-checkbox'
import props from '@/packages/checkbox/checkbox'

export default defineComponent({
  name: 'SCheckboxButton',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props) {
    const {
      model,
      computedName,
      isGroup,
      isChecked,
      isDisabled,
      handleChange,
      size,
      focus
    } = useCheckbox(props)

    return {
      model,
      focus,
      computedName,
      isGroup,
      isChecked,
      isDisabled,
      handleChange,
      size
    }
  }
})
</script>
