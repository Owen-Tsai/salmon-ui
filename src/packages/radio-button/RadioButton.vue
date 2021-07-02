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
    :tabindex="tabindex"
    @keydown.space.stop.prevent="model = isDisabled ? model : value"
  >
    <input
      class="sui-radio-button__original"
      ref="inputEl"
      type="radio"
      v-model="model"
      :value="value" :name="name"
      :disabled="isDisabled"
      @change="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      tabindex="-1"
    >
    <span class="sui-radio-button__btn">
      <slot>{{ value }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    computed
  } from 'vue'

  import useRadio from '@/utils/compositions/radio'
  import throwError from '@/utils/class.error'

  export default defineComponent({
    name: 'SRadioButton',
    props: {
      value: [String, Number, Boolean],
      modelValue: [String, Number, Boolean],
      disabled: Boolean,
      name: String,
    },
    setup(props, { emit }) {
      const isFocused = ref(false)

      const tabindex = computed(() => {
        return (
          isDisabled.value ||
          (isGroup.value && model.value !== props.value)
        ) ? -1 : 0
      })

      const {
        isDisabled,
        isGroup,
        model,
        handleChange,
        radioGroup
      } = useRadio(props, emit)

      if (!isGroup.value) {
        throwError(
          'sui-radio-button',
          'radio-buttons can only be used inside radio-groups'
        )
      }

      const size = computed(() => {
        if (radioGroup.size !== undefined) {
          return radioGroup.size
        }

        return ''
      })

      return {
        model,
        tabindex,
        size,

        isDisabled,
        isGroup,
        isFocused,

        handleChange,
      }
    }
  })
</script>
