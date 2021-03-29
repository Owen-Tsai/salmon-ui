<template>
  <div
    class="sui-input"
    :class="[...{
      'is-disabled': disabled,
      'is-readonly': isReadonly,
      'is-exceeded': isExceeded,
    }, {
      'has-prefix': prefixIcon || $slots.prefix,
      'has-suffix': suffixIcon || $slots.suffix,
      'has-prepend': $slots.prepend,
      'has-append': $slots.append,
      'sui-input--group': $slots.prepend || $slots.append
    }]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- prepend slot -->
    <div v-if="$slots.prepend" class="sui-input__prepend">
      <slot name="prepend"></slot>
    </div>
    <!-- original input -->
    <input
      class="sui-input__input"
      ref="inputEl"
      v-bind="attrs"
      :type="passwordTogglable ? (passwordVisible ? 'text' : 'password') : type"
      :readonly="readonly"
      :disabled="disabled"
      :aria-label="label"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    >

    <!-- prefix -->
    <span v-if="prefixIcon" class="sui-input__prefix">

    </span>

  </div>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  const _sizes = ['small', '', 'large']

  export default defineComponent({
    name: 'SInput',
    inheritAttrs: false,
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      size: {
        type: String,
        default: '',
        validator: (v: string) => {
          return _sizes.includes(v)
        }
      },
      disabled: Boolean,
      readonly: Boolean,
      showPasswordToggle: Boolean,
      clearable: Boolean,
      showWordCount: Boolean,
      autocomplete: {
        type: String,
        default: 'off',
        validator: (v:string) => ['on', 'off'].includes(v)
      },
      tabindex: String,
      label: String,
      placeholder: String,
      prefixIcon: String,
      suffixIcon: String,
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(props, ctx) {

    }
  })
</script>
