<template>
  <label
    :class="[
      'sui-radio',
      isDisabled ? 'is-disabled' : '',
      model === value ? 'is-checked' : '',
      focus ? 'is-focus': ''
    ]"
    :aria-disabled="isDisabled"
  >
    <span class="sui-radio__input">
      <span class="sui-radio__inner"></span>
      <input
        type="radio"
        ref="radioRef"
        v-model="model"
        class="sui-radio__original"
        :value="value" :name="name"
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

  import useRadio from '@/utils/compositions/radio'

  export default defineComponent({
    name: 'SRadio',
    props: {
      value: [String, Number, Boolean],
      modelValue: [String, Number, Boolean],
      disabled: Boolean,
      name: String,
    },
    setup(props, { emit }) {
      const focus = ref(false)

      const {
        model,
        isDisabled,
        handleChange
      } = useRadio(props, emit)

      return {
        isDisabled,
        model,
        handleChange,
        focus
      }
    }
  })
</script>
