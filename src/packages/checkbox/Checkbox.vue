<template>
  <label
    :class="[
      'sui-checkbox',
      isDisabled ? 'is-disabled' : null,
      isChecked ? 'is-checked' : null,
      focus ? 'is-focus' : null,
      indeterminate ? 'is-indeterminate' : null
    ]"
  >
    <span class="sui-checkbox__input">
      <span class="sui-checkbox__inner"></span>
      <input
        v-if="checkedValue || uncheckedValue"
        class="sui-checkbox__original"
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
        class="sui-checkbox__original"
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
    </span>

    <span
      class="sui-checkbox__label"
      v-if="$slots.default"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import props from './checkbox'
import { useCheckbox } from './use-checkbox'

export default defineComponent({
  name: 'SCheckbox',
  props: props,
  emits: ['update:modelValue', 'change'],
  setup(props) {
    const {
      isGroup,
      isDisabled,
      isChecked,
      model,
      handleChange,
      computedName,
      focus
    } = useCheckbox(props)

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
