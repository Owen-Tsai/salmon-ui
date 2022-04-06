<template>
  <label
    :class="[
      'sui-radio',
      isDisabled ? 'is-disabled' : null,
      model === value ? 'is-checked' : null,
      focus ? 'is-focused': null
    ]"
    :aria-disabled="isDisabled"
    :aria-checked="model === value"
  >
    <span class="sui-radio__inner">
      <span class="sui-radio__dot"></span>
      <input
        ref="radioRef"
        v-model="model"
        type="radio"
        class="sui-radio__input"
        :value="value"
        :name="computedName"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>

    <span class="sui-radio__label">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'

import {
  useRadio,
  props
} from './radio'

export default defineComponent({
  name: 'SRadio',
  props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const focus = ref(false)

    const {
      model,
      computedName,
      isDisabled,
      handleChange
    } = useRadio(props, emit)

    return {
      isDisabled,
      model,
      computedName,
      handleChange,
      focus
    }
  }
})
</script>
