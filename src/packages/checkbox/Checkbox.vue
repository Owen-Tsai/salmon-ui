<template>
  <label
    :class="[
      'sui-checkbox',
      isDisabled ? 'is-disabled' : null,
      isChecked ? 'is-checked' : null,
      focus ? 'is-focused' : null,
      indeterminate ? 'is-indeterminate' : null
    ]"
  >
    <span class="sui-checkbox__inner">
      <span class="sui-checkbox__check"></span>
      <input
        v-if="checkedValue || uncheckedValue"
        ref="checkboxRef"
        v-model="model"
        class="sui-checkbox__input"
        type="checkbox"
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
        ref="checkboxRef"
        v-model="model"
        class="sui-checkbox__input"
        type="checkbox"
        :checked="isChecked"
        :name="computedName"
        :value="value"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>

    <span
      v-if="$slots.default"
      class="sui-checkbox__label"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  props,
  useCheckbox
} from './checkbox'

export default defineComponent({
  name: 'SCheckbox',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const {
      isGroup,
      isDisabled,
      isChecked,
      model,
      handleChange,
      computedName,
      focus
    } = useCheckbox(props, emit)

    return {
      isChecked,
      isDisabled,
      isGroup,
      computedName,
      focus,
      model,
      handleChange
    }
  }
})
</script>
