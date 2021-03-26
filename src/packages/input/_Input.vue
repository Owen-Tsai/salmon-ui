<template>
  <div
    :class="[
      type === 'textarea' ? 'sui-textarea' : 'sui-input',
      size ? `sui-input--${size}` : '',
      {
        'is-disabled': disabled,
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
    ]"
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
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
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
      <span v-if="isSuffixVisible()" class="sui-input__suffix">
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
            v-if="showPasswordToggleIcon"
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
          <!-- TODO: implement after form-item component -->
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
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :style="textareaStyle"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
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
    PropType,
    shallowRef,
    nextTick,
    watch,
    onMounted,
    onUpdated
  } from 'vue'
  import SIcon from '../icon'
  import useAttrs from '@/utils/use-attrs'
  import { isObject } from '@vue/shared'
  import computeTextareaHeight from './computeTextareaHeight'

  const _sizes = ['large', '', 'small']
  const _resizeOptions = ['horizontal', 'vertical', 'both', 'none']
  const _pendantMap = {
    prefix: 'prepend',
    suffix: 'append'
  }

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
          return _resizeOptions.includes(v)
        }
      },
      autosize: {
        type: [Boolean, String] as PropType<autosizeProp>,
        default: false
      },
      validateEvent: Boolean
    },
    emits: [
      'update:modelValue', 'input', 'change', 'focus', 'blur',
      'clear', 'mouseleave', 'mouseenter', 'keydown'
    ],
    setup(props, ctx) {
      const instance = getCurrentInstance()
      const attrs = useAttrs()

      const inputEl = ref()
      const textareaEl = ref()
      const isFocused = ref(false)
      const isHovering = ref(false)
      const isComposing = ref(false)
      const passwordVisible = ref(false)
      const textareaComputedStyles = shallowRef({})

      const renderedInputEl = computed(() =>
        inputEl.value || textareaEl.value
      )
      const textareaStyle = computed(() => ({
        ...textareaComputedStyles,
        resize: props.resize
      }))
      const nativeInputValue = computed(() => (
        (props.modelValue === null || props.modelValue === undefined) ? '' : String(props.modelValue)
      ))
      const wordLimit = computed(() => ctx.attrs.maxlength)
      // only show clear icon when user is hovering or focusing on an
      // clearable input component without disabled and readonly attr
      const showClearIcon = computed(() => {
        return (props.clearable && !props.disabled && !props.readonly) &&
          (isFocused.value || isHovering.value)
      })
      // only show password visibility toggle icon when user is focused on an
      // input component without disabled and readonly attr
      const showPasswordToggleIcon = computed(() => {
        return (props.passwordToggleable && !props.disabled && !props.readonly) &&
          (!!nativeInputValue.value || isFocused.value)
      })
      // only show word counter when input element is normal text field or textarea
      const wordLimitVisible = computed(() => {
        return props.showWordLimit && ctx.attrs.maxlength &&
          (props.type === 'text' || props.type === 'textarea') &&
          !props.disabled && !props.readonly && !props.passwordToggleable
      })
      const textLength = computed(() => {
        return typeof props.modelValue === 'number' ?
          String(props.modelValue).length : (props.modelValue.length || 0)
      })
      const computedExceeded = computed(() => {
        return wordLimitVisible.value &&
          (textLength.value > Number(wordLimit.value))
      })
      const resizeTextarea = () => {
        const { type, autosize } = props
        if(type !== 'textarea') return

        if(autosize) {
          const minRows = isObject(autosize) ? autosize.minRows : 0
          const maxRows = isObject(autosize) ? autosize.maxRows : 0

          textareaComputedStyles.value = computeTextareaHeight(textareaEl.value, minRows, maxRows)
        } else {
          textareaComputedStyles.value = {
            minHeight: computeTextareaHeight(textareaEl).minHeight
          }
        }
      }

      const setNativeInputValue = () => {
        const el = renderedInputEl.value
        if(!el || el.value === nativeInputValue.value) return
        el.value = nativeInputValue.value
      }

      const setIconOffset = place => {
        // place: prepend or append
        const { el }: any = instance?.vnode
        const iconElList: HTMLSpanElement[] =
          Array.from(el.querySelectorAll(`.sui-input__${place}`))
        const targetIconEl = iconElList.find(item => item.parentNode === el)

        if(!targetIconEl) return
        const pendant = _pendantMap[place]

        if(ctx.slots[pendant]) {
          const amount = el.querySelector(`sui-input-group__${pendant}`).offsetWidth
          targetIconEl.style.transform = `translateX: ${place === 'suffix' ? '-' : ''}${amount}px`
        } else {
          targetIconEl.removeAttribute('style')
        }
      }

      const updateIconOffset = () => {
        setIconOffset('prefix')
        setIconOffset('suffix')
      }

      const handleInput = event => {
        const isComposing = ref(false)

        const { value } = event.target

        if(isComposing.value) return

        ctx.emit('update:modelValue', value)
        ctx.emit('input', value)

        nextTick(() => {
          setNativeInputValue()
        })
      }

      const handleChange = event => {
        ctx.emit('change', event.target.value)
      }

      const focus = () => {
        nextTick(() => {
          renderedInputEl.value.focus()
        })
      }
      const blur = () => {
        renderedInputEl.value.blur()
      }
      const select = () => {
        renderedInputEl.value.select()
      }

      const handleFocus = event => {
        isFocused.value = true
        ctx.emit('focus', event)
      }
      const handleBlur = event => {
        isFocused.value = false
        ctx.emit('blur', event)
      }
      const handleCompositionStart = () => {
        isComposing.value = true
      }
      const handleCompositionEnd = () => {
        isComposing.value = false
      }

      const clearInput = () => {
        ctx.emit('update:modelValue', '')
        ctx.emit('change', '')
        ctx.emit('clear')
      }

      const changePasswordVisible = () => {
        passwordVisible.value = !passwordVisible.value
        focus()
      }

      const isSuffixVisible = () => {
        return ctx.slots.suffix ||
          props.suffixIcon ||
          showClearIcon.value ||
          showPasswordToggleIcon.value ||
          wordLimitVisible.value
      }

      watch(() => props.modelValue, () => {
        nextTick(resizeTextarea)
      })
      watch(nativeInputValue, () => {
        setNativeInputValue()
      })
      watch(() => props.type, () => {
        nextTick(() => {
          setNativeInputValue()
          resizeTextarea()
          updateIconOffset()
        })
      })

      onMounted(() => {
        setNativeInputValue()
        updateIconOffset()
        nextTick(resizeTextarea)
      })
      onUpdated(() => {
        nextTick(updateIconOffset)
      })
      const handleMouseLeave = e => {
        isHovering.value = false
        ctx.emit('mouseleave', e)
      }
      const handleMouseEnter = e => {
        isHovering.value = true
        ctx.emit('mouseenter', e)
      }
      const handleKeydown = e => {
        ctx.emit('keydown', e)
      }

      return {
        inputEl, textareaEl,
        attrs,
        textareaStyle,
        computedExceeded,
        showPasswordToggleIcon,
        passwordVisible,
        wordLimit,
        wordLimitVisible,
        showClearIcon,
        focus, blur, select,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleCompositionStart,
        handleCompositionEnd,
        clearInput,
        changePasswordVisible,
        isSuffixVisible,
        handleMouseEnter,
        handleMouseLeave,
        handleKeydown
      }
    }
  })
</script>
