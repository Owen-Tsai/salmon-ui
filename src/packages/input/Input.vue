<template>
  <div
    :class="[
      type === 'textarea' ? 'sui-textarea' : 'sui-input',
      size ? `sui-input--${size}` : '',
      {
        'is-disabled': computedDisabled,
        'is-exceeded': computedExceeded,
      },
      {
        'sui-input-group': $slots.prepend || $slots.append,
        'sui-input-group--append': $slots.append,
        'sui-input-group--prepend': $slots.prepend,
        'sui-input--prefix': prefixIcon || $slots.prefix,
        'sui-input-suffix': suffixIcon || $slots.suffix || clearable || passwordToggleable
      },
      $attrs.class
    ]",
    :style="$attrs.style"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="sui-input-group__prepend">
        <slot name="prepend"></slot>
      </div>

      <!-- original input -->
      <input
        v-if="type !== 'textarea'"
        ref="inputEl"
        class="sui-input__original"
        v-bind="attrs"
        :type="passwordToggleable ? (passwordVisible ? 'text' : 'password') : type"
        :disabled="computedDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      >

      <!-- prefix -->
      <span v-if="$slots.prefix || prefixIcon" class="sui-input__prefix">
        <slot name="prefix"></slot>
        <s-icon v-if="prefixIcon" :name="prefixIcon"></s-icon>
      </span>
      <!-- suffix -->
      <span v-if="hasSuffix" class="sui-input__suffix">
        <span class="sui-input__suffix-inner">
          <!-- custom suffix -->
          <template
            v-if="!showClearIcon || !showPasswordToggleIcon || !wordLimitVisible"
          >
            <slot name="suffix"></slot>
            <s-icon
              v-if="suffixIcon"
              class="sui-input__icon"
              :name="suffixIcon"
            ></s-icon>
          </template>
          <!-- clear icon -->
          <s-icon
            v-if="showClearIcon"
            class="sui-input__icon sui-input__clear-icon"
            name="x"
            @click="clearInput"
            @mousedown.prevent
          ></s-icon>
          <!-- password toggle icon -->
          <s-icon
            v-if="showPasswirdToggleIcon"
            class="sui-input__icon sui-input__toggle-icon"
            :name="passwordVisible ? 'eye-off' : 'eye'"
            @click="changePasswordVisible"
          ></s-icon>
          <!-- word limit indicator -->
          <span v-if="wordLimitVisible" class="sui-input__count">
            <span class="sui-input__count-inner">
              {{ textLength }}/{{ wordLimit }}
            </span>
          </span>
          <!-- validate state icon -->
          <s-icon
            v-if="validateState"
            class="sui-input__icon"
            :name="validateIcon"
          ></s-icon>
        </span>
      </span> <!-- end of suffix -->

      <div v-if="$slots.append" class="sui-input-input__append">
        <slot name="append"></slot>
      </div>
    </template> <!-- end of non-textarea input -->

    <template v-else>
      <textarea
        ref="textareaEl"
        class="sui-textarea__original"
        v-bind="attrs"
        :tabindex="tabindex"
        :disabled="computedDisabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="textareaStyle"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      ></textarea>
      <span v-if="wordLimitVisible && type === 'textarea'" class="sui-input__count">
        {{ textLength }}/{{ wordLimit }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    getCurrentInstance,
    computed,
    ref,
    PropType
  } from 'vue'
  import SIcon from '../icon'

  const _sizes = ['large', '', 'small']
  const _resizeOptions = ['horizontal', 'vertical', 'both', 'none']

  // autosize prop can either be an object or a boolean value
  type autosizeProp = {
    minRows?: number,
    maxRows?: number
  } | boolean

  export default defineComponent({
    name: 'SInput',
    components: {
      SIcon
    },
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
        validator: (v: string) => {
          return _sizes.includes(v)
        },
      },
      disabled: Boolean,
      readonly: Boolean,
      passwordToggleable: Boolean,
      showPasswordToggleIcon: Boolean,
      clearable: Boolean,
      showWordLimit: Boolean,
      autocomplete: {
        type: String,
        default: 'off',
        validator: (val: string) => ['on', 'off'].includes(val),
      },
      tabindex: String,
      label: String,
      placeholder: String,
      prefixIcon: String,
      suffixIcon: String,
      resize: {
        type: String,
        default: undefined,
        validator: (v: string) => {
          return _sizes.includes(v)
        }
      },
      autosize: {
        type: [Boolean, String] as PropType<autosizeProp>,
        default: false
      },
      validateEvent: Boolean
    },
    emits: [
      'update:modelValue', 'input', 'change', 'focus', 'blue',
      'clear', 'mouseleave', 'mouseenter', 'keydown'
    ],
    setup(props, ctx) {
      const instance = getCurrentInstance()
      const attrs =
    }
  })
</script>
