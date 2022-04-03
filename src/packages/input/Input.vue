<template>
  <div
    class="sui-input"
    :class="[{
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-exceeded': isExceeded,
    }, {
      'is-hovering': isHovering,
      'is-focused': isFocused
    }, {
      'has-prefix': $slots.prefix || prefixIcon,
      'has-suffix': $slots.suffix || clearable || showPasswordToggler || suffixIcon,
      'has-prepend': $slots.prepend,
      'has-append': $slots.append,
      'sui-input--group': $slots.prepend || $slots.append
    }, $attrs.class]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- prepend slot -->
    <div
      v-if="$slots.prepend"
      class="sui-input__prepend"
    >
      <slot name="prepend"></slot>
    </div>
    <!-- original input -->
    <input
      ref="inputEl"
      class="sui-input__input"
      v-bind="attrs"
      :type="showPasswordToggler ? (
        isPasswordVisible ? 'text' : 'password'
      ) : type"
      :readonly="readonly"
      :disabled="disabled"
      :aria-label="label"
      :placeholder="placeholder"
      :autocomplete="autoComplete ? 'on' : 'off'"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeyDown"
    >

    <!-- prefix -->
    <span
      v-if="$slots.prefix || prefixIcon"
      class="sui-input__prefix"
    >
      <slot name="prefix">
        <s-icon>
          <component :is="prefixIcon"></component>
        </s-icon>
      </slot>
    </span>
    <!-- suffix -->
    <span
      v-if="hasSuffix"
      class="sui-input__suffix"
    >
      <span
        ref="suffixWrapperEl"
        class="sui-input__suffix-inner"
      >
        <!-- custom suffix -->
        <template
          v-if="!showClearIcon || !showPasswordToggler || !showWordCounter"
        >
          <slot name="suffix">
            <s-icon>
              <component :is="suffixIcon"></component>
            </s-icon>
          </slot>
        </template>
        <!-- password toggle -->
        <s-icon
          v-if="showPasswordToggler"
          class="sui-input__icon toggle-password"
          @click="togglePassword"
        >
          <eye-fill v-show="isPasswordVisible"></eye-fill>
          <eye-close v-show="!isPasswordVisible"></eye-close>
        </s-icon>
        <!-- clear -->
        <s-icon
          v-if="showClearIcon && !disabled && !readonly"
          class="sui-input__icon clear-input"
          @click="clearInput"
        >
          <close></close>
        </s-icon>
        <!-- word count -->
        <span
          v-if="showWordCounter"
          class="sui-input__count"
        >
          <span class="sui-input__count-inner">
            {{ textLength }}/{{ maxLength }}
          </span>
        </span>
      </span>
    </span> <!-- end of suffix -->

    <!-- append slot -->
    <div
      v-if="$slots.append"
      class="sui-input__append"
    >
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  computed,
  watch,
  nextTick,
  getCurrentInstance,
  onMounted,
  onUpdated,
  SetupContext,
  ComponentInternalInstance
} from 'vue'
import useAttrs from '@/utils/use-attrs'
import SIcon from '../icon'

import {
  props,
  emits,
  useStates,
  useAffixes,
  useEvents,
  useActions,
  useIconPosition,
  EmitTypes
} from './input'

import {
  EyeFill, EyeClose,
  Close
} from '@salmon-ui/icons'

type Ctx = SetupContext<EmitTypes[]>

export default defineComponent({
  name: 'SInput',
  components: {
    SIcon,
    EyeFill, EyeClose,
    Close,
  },
  inheritAttrs: false,
  props,
  emits,
  setup(props, ctx) {
    const inputEl = ref() as Ref<HTMLInputElement>
    const attrs = useAttrs()
    const suffixWrapperEl = ref() as Ref<HTMLElement>
    const instance = getCurrentInstance() as ComponentInternalInstance

    const states = useStates(props, ctx as Ctx)
    const {
      isFocused,
      isHovering,
      isPasswordVisible,
      inputValue,
      textLength,
      maxLength
    } = states

    const {
      hasSuffix,
      showClearIcon,
      showPasswordToggler,
      showWordCounter
    } = useAffixes(props, ctx as Ctx, states)

    const isExceeded = computed(() =>
      showWordCounter.value &&
      (textLength.value > Number(maxLength.value))
    )

    const {
      handleBlur,
      handleChange,
      handleCompositionEnd,
      handleCompositionStart,
      handleFocus,
      handleInput,
      handleKeyDown,
      handleMouseEnter,
      handleMouseLeave
    } = useEvents(ctx.emit, states)

    const {
      clearInput,
      togglePassword
    } = useActions(props, ctx as Ctx, states)

    const setNativeInputValue = () => {
      if (inputEl.value.value === inputValue.value) return
      inputEl.value.value = inputValue.value
    }

    const { updateIconOffset } = useIconPosition(
      ctx as Ctx,
      instance
    )
    
    watch(inputValue, () => {
      setNativeInputValue()
    })
    watch(() => props.type, () => {
      nextTick(() => {
        setNativeInputValue()
        updateIconOffset()
      })
    })

    onMounted(() => {
      setNativeInputValue()
      updateIconOffset()
    })
    onUpdated(() => {
      nextTick(updateIconOffset)
    })

    return {
      inputEl,
      suffixWrapperEl,

      attrs,
      isPasswordVisible,
      maxLength,
      textLength,

      hasSuffix,
      showClearIcon,
      showPasswordToggler,
      showWordCounter,

      isExceeded,
      isFocused,
      isHovering,

      togglePassword,
      clearInput,

      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleMouseEnter,
      handleMouseLeave,
      handleCompositionStart,
      handleCompositionEnd,
      handleKeyDown
    }
  }
})
</script>
