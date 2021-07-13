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
        :name="computedName"
        :value="value"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>

    <span class="sui-checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref
  } from 'vue'

  import useCheckbox from '@/utils/compositions/checkbox'

  export default defineComponent({
    name: 'SCheckbox',
    props: {
      modelValue: [ Boolean, Number, String ],
      value: [ Boolean, Number, String ],
      checkedValue: [ String, Number ],
      uncheckedValue: [ String, Number ],
      indeterminate: Boolean,
      disabled: Boolean,
      name: String
    },
    emits: ['update:modelValue', 'change'],
    setup(props, { emit }) {
      const focus = ref(false)

      const {
        isGroup,
        isDisabled,
        isChecked,
        model,
        handleChange,
        computedName
      } = useCheckbox(props, emit)

      return {
        focus,
        isGroup,
        isDisabled,
        model,
        isChecked,
        computedName,
        handleChange
      }
    }
  })
</script>
