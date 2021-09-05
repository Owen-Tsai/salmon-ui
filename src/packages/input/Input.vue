<template>
  <div
    class="sui-input"
    :class="[{
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-exceeded': isExceeded,
    }, {
      'is-hovering': hoveringInput && ($slots.prepend || $slots.append),
      'is-focused': isFocused
    }, {
      'has-prefix': $slots.prefix,
      'has-suffix': $slots.suffix || clearable || showPasswordToggle,
      'has-prepend': $slots.prepend,
      'has-append': $slots.append,
      'sui-input--group': $slots.prepend || $slots.append
    }, $attrs.class]"
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
      :type="showPasswordToggle ? (passwordVisible ? 'text' : 'password') : type"
      :readonly="readonly"
      :disabled="disabled"
      :aria-label="label"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :style="inputStyle"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
      @mouseenter="handleMouseEnterInput"
      @mouseleave="handleMouseLeaveInput"
    >

    <!-- prefix -->
    <span v-if="$slots.prefix" class="sui-input__prefix">
      <slot name="prefix"></slot>
    </span>
    <!-- suffix -->
    <span
      v-if="showSuffixIcon"
      class="sui-input__suffix"
    >
      <span class="sui-input__suffix-inner" ref="suffixWrapperEl">
        <!-- custom suffix -->
        <template
          v-if="!showSuffixClear || !showSuffixPasswordToggle || !showSuffixWordCount"
        >
          <slot name="suffix"></slot>
        </template>
        <!-- password toggle -->
        <s-icon
          v-if="showSuffixPasswordToggle"
          class="sui-input__icon toggle-password"
          @click="handlePasswordToggle"
        >
          <eye-fill v-show="passwordVisible"></eye-fill>
          <eye-close v-show="!passwordVisible"></eye-close>
        </s-icon>
        <!-- clear -->
        <s-icon
          v-if="showSuffixClear && !disabled && !readonly"
          class="sui-input__icon clear-input"
          @click="clearInput"
        >
          <close></close>
        </s-icon>
        <!-- word count -->
        <span v-if="showSuffixWordCount" class="sui-input__count">
          <span class="sui-input__count-inner">
            {{ textLength }}/{{ maxLength }}
          </span>
        </span>
      </span>
    </span> <!-- end of suffix -->

    <!-- append slot -->
    <div v-if="$slots.append" class="sui-input__append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    computed,
    watch,
    nextTick,
    PropType,
    getCurrentInstance,
    onMounted,
    onUpdated
  } from 'vue'
  import useAttrs from '@/utils/use-attrs'
  import SIcon from '../icon'

  import {
    EyeFill, EyeClose,
    Close
  } from '@salmon-ui/icons'

  const _sizes = ['small', '', 'large']
  const _pendantMap = {
    suffix: 'append',
    prefix: 'prepend',
  }

  export default defineComponent({
    name: 'SInput',
    inheritAttrs: false,
    components: {
      SIcon,
      EyeFill, EyeClose,
      Close,
    },
    props: {
      modelValue: {
        type: [String, Number],
        default: undefined
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
      inputStyle: {
        type: Object as PropType<CSSStyleRule>,
      }
    },
    emits: [
      'update:modelValue', 'change', 'focus', 'blur', 'input',
      'keydown', 'clear'
    ],
    setup(props, ctx) {
      const inputEl = ref()
      const attrs = useAttrs()
      const isFocused = ref(false)
      const isHovering = ref(false)
      const isComposing = ref(false)
      const passwordVisible = ref(false)
      const suffixWrapperEl = ref()
      const hoveringInput = ref(false)
      const instance = getCurrentInstance()

      const maxLength = computed(() => ctx.attrs.maxlength)
      const textLength = computed(() => {
        if(typeof props.modelValue === 'number') {
          return String(props.modelValue).length
        }

        return props.modelValue?.length || 0
      })
      const showSuffixWordCount = computed(() =>
        ctx.attrs.maxlength && props.showWordCount &&
        (!props.disabled && !props.readonly && !props.showPasswordToggle)
      )
      const isExceeded = computed(() =>
        showSuffixWordCount.value &&
        (textLength.value > Number(maxLength.value))
      )
      const showSuffixIcon = computed(() =>
        ctx.slots.suffix ||
        props.showPasswordToggle ||
        props.showWordCount ||
        props.clearable
      )
      const showSuffixClear = computed(() =>
        props.clearable &&
        (isHovering.value || isFocused.value) &&
        textLength.value > 0
      )
      const showSuffixPasswordToggle = computed(() =>
        props.showPasswordToggle && textLength.value > 0
      )
      const nativeInputValue = computed(() =>
        (props.modelValue === null || props.modelValue === undefined) ?
          '' : String(props.modelValue)
      )

      const handlePasswordToggle = () => {
        passwordVisible.value = !passwordVisible.value
      }
      const clearInput = () => {
        ctx.emit('update:modelValue', '')
        ctx.emit('change', '')
        ctx.emit('clear')
      }
      const setNativeInputValue = () => {
        if(inputEl.value.value === nativeInputValue.value) return
        inputEl.value.value = nativeInputValue.value
      }
      const getIconOffset = (place) => {
        const { el }: any = instance?.vnode
        if(!el) return

        const elList: HTMLSpanElement[] = Array.from(el.querySelectorAll(`.sui-input__${place}`))
        const target = elList.find(item => item.parentNode === el)
        if(!target) return

        const pendant = _pendantMap[place]
        if(ctx.slots[pendant]) {
          target.style.transform = `
            translateX(${place === 'suffix' ? '-' : ''}${el.querySelector(`.sui-input__${pendant}`).offsetWidth}px)
          `
        } else {
          target.removeAttribute('style')
        }
      }

      const updateIconOffset = () => {
        getIconOffset('prefix')
        getIconOffset('suffix')
      }

      const handleInput = (event) => {
        ctx.emit('update:modelValue', event.target.value)
        ctx.emit('input', event.target.value)

        nextTick(setNativeInputValue)
      }
      const handleChange = (event) => {
        ctx.emit('change', event.target.value)
      }
      const handleCompositionStart = () => {
        console.log(`composing`)
        isComposing.value = true
      }
      const handleCompositionEnd = () => {
        console.log(`composing-end`)
        isComposing.value = false
      }
      const handleMouseEnter = () => {
        isHovering.value = true
      }
      const handleMouseLeave = () => {
        isHovering.value = false
      }
      const handleMouseEnterInput = () => {
        hoveringInput.value = true
      }
      const handleMouseLeaveInput = () => {
        hoveringInput.value = false
      }
      const handleFocus = (e) => {
        isFocused.value = true
        ctx.emit('focus', e)
      }
      const handleBlur = (e) => {
        isFocused.value = false
        ctx.emit('blur', e)
      }
      const handleKeydown = (e) => {
        ctx.emit('keydown', e)
      }

      watch(nativeInputValue, () => {
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
        passwordVisible,
        maxLength,
        textLength,

        showSuffixIcon,
        showSuffixClear,
        showSuffixPasswordToggle,
        showSuffixWordCount,

        isExceeded,
        isFocused,
        hoveringInput,

        handlePasswordToggle,
        clearInput,

        handleMouseEnter,
        handleMouseLeave,
        handleMouseEnterInput,
        handleMouseLeaveInput,

        handleInput,
        handleChange,
        handleCompositionStart,
        handleCompositionEnd,
        handleFocus,
        handleBlur,
        handleKeydown
      }
    }
  })
</script>
