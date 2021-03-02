<template>
  <label
    :class="[
      'sui-radio',
      computedDisabled ? 'is-disabled' : '',
      model === label ? 'is-checked' : '',
      focus ? 'is-focus': ''
    ]"
    :aria-disabled="computedDisabled"
  >
    <span class="sui-radio__input">
      <span class="sui-radio__inner"></span>
      <input
        type="radio"
        ref="radioRef"
        v-model="model"
        class="sui-radio__original"
        :value="label" :name="name"
        :disabled="computedDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>

    <span class="sui-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
  import {
    defineComponent,
    ref,
    computed,
    inject,
    nextTick
  } from 'vue'

  export default defineComponent({
    name: 'SRadio',
    props: {
      label: [String, Number, Boolean],
      modelValue: [String, Number, Boolean],
      disabled: Boolean,
      name: String,
    },
    setup(props, ctx) {
      const focus = ref(false)
      // injected
      const radioGroup = inject('radioGroup', null)

      // computed
      const isGroup = computed(() => {
        return !!radioGroup
      })
      const computedDisabled = computed(() => {
        if(isGroup.value) {
          return radioGroup.disabled || props.disabled
        } else {
          return props.disabled
        }
      })
      const model = computed({
        get() {
          return isGroup.value ? radioGroup.modelValue : props.modelValue
        },
        set(val) {
          if(isGroup.value) {
            radioGroup.changeEvent(val)
          } else {
            ctx.emit('update:modelValue', val)
          }
        }
      })

      // methods
      const handleChange = () => {
        nextTick(() => {
          ctx.emit('change', model.value)
        })
      }

      return {
        computedDisabled,
        model,
        handleChange,
        focus
      }
    }
  })
</script>
