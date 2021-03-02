<template>
  <label
    :class="[
      'sui-checkbox',
      computedDisabled ? 'is-disabled' : '',
      computedChecked ? 'is-checked' : '',
      focus ? 'is-focus' : ''
    ]"
  >
    <span class="sui-checkbox__input">
      <span class="sui-checkbox__inner"></span>
      <input
        v-if="checkedLabel || uncheckedLabel"
        class="sui-checkbox__original"
        type="checkbox"
        ref="checkboxRef"
        v-model="model"
        :checked="computedChecked"
        :name="name"
        :disabled="computedDisabled"
        :true-value="checkedLabel"
        :false-value="uncheckedLabel"
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
        :name="name"
        :value="label"
        :disabled="computedDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>

    <span class="sui-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
  import { defineComponent, inject, computed, ref } from 'vue'

  export default defineComponent({
    name: 'SCheckbox',
    props: {
      modelValue: [ Boolean, Number, String ],
      label: [ Boolean, Number, String ],
      checkedLabel: [ String, Number ],
      uncheckedLabel: [ String, Number ],
      indeterminate: Boolean,
      disabled: Boolean,
      checked: Boolean,
      name: String
    },
    setup(props, ctx) {
      // injected
      const checkboxGroup = inject('checkboxGroup', null)

      // states
      const focus = ref(false)
      const storedModel = computed(() =>
        checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue
      )
      let selfModel = false
      const exceedLimit = ref(false)

      // computed
      const isGroup = computed(() => {
        return !!checkboxGroup
      })
      const exceedLimitDisabled = computed(() =>{
        const max = checkboxGroup.max?.value
        const min = checkboxGroup.min?.value
        return !!(max || min) && (model.value.length >= max && !computedChecked.value) ||
          (model.value.length <= min && computedChecked.value)
      })
      const computedDisabled = computed(() => {
        if(isGroup.value) {
          return checkboxGroup.disabled.value || props.disabled || exceedLimitDisabled.value
        } else {
          return props.disabled
        }
      })
      const model = computed({
        get() {
          return isGroup.value ? storedModel.value : (props.modelValue ?? selfModel)
        },
        set(val) {
          if(isGroup.value && Array.isArray(val)) {
            exceedLimit.value = false

            if(checkboxGroup.min && val.length < checkboxGroup.min.value) {
              exceedLimit.value = true
            }
            if(checkboxGroup.max && val.length > checkboxGroup.max.value) {
              exceedLimit.value = true
            }

            exceedLimit.value === false && checkboxGroup?.changeEvent?.(val)
          } else {
            ctx.emit('update:modelValue', val)
            selfModel = val
          }
        }
      })
      const computedChecked = computed(() => {
        const value = model.value

        if (typeof value === 'boolean') {
          return value
        } else if (Array.isArray(value)) {
          return value.includes(props.label)
        } else if (value !== null && value !== undefined) {
          return value === props.checkedLabel
        }

        return false
      })

      // methods
      const handleChange = evt => {
        if(exceedLimit.value) return
        const target = evt.target
        const value = target.checked ? (props.checkedLabel ?? true) : (props.uncheckedLabel ?? false)

        ctx.emit('change', value)
      }

      return {
        focus,
        isGroup,
        computedDisabled,
        model,
        computedChecked,
        handleChange
      }
    }
  })
</script>
