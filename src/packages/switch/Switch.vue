<template>
  <button
    class="sui-switch"
    :class="{
      'is-disabled': computedDisabled,
      'is-checked': checked
    }"
    :disabled="computedDisabled"
    role="switch" type="button"
    :aria-checked="checked"
    :aria-disabled="computedDisabled"
    :style="{ minWidth: `${(minWidth || 48)}px` }"
    @click.prevent="switchValue"
  >
    <span
      v-if="activeText || activeIcon"
      class="sui-switch__label sui-switch__label--active"
    >
      <template v-if="activeText">{{ activeText }}</template>
      <s-icon :name="activeIcon"></s-icon>
    </span>

    <input
      class="sui-switch__input"
      ref="inputEl"
      :name="name"
      type="checkbox"
      :disabled="computedDisabled"
      @change="handleChange"
    >

    <span
      v-if="inactiveText || inactiveIcon"
      class="sui-switch__label sui-switch__label--inactive"
    >
      <template v-if="inactiveText">{{ inactiveText }}</template>
      <s-icon :name="inactiveIcon"></s-icon>
    </span>
  </button>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    computed,
    watch,
    nextTick,
    onMounted
  } from 'vue'
  import SIcon from '../icon'

  export default defineComponent({
    name: 'SSwitch',
    components: {
      SIcon
    },
    props: {
      disabled: Boolean,
      activeText: String,
      activeIcon: String,
      activeColor: String,
      activeValue: {
        type: [Boolean, Number, String],
        default: true
      },
      inactiveText: String,
      inactiveIcon: String,
      inactiveColor: String,
      inactiveValue: {
        type: [Boolean, Number, String],
        default: false
      },
      name: String,
      minWidth: Number,
      loading: Boolean,
      modelValue: {
        type: [Boolean, Number, String],
        default: false
      }
    },
    setup(props, ctx) {
      // refs
      const inputEl = ref()
      const panelEl = ref()

      // states
      const checked = computed(() => {
        return props.modelValue === props.activeValue
      })
      const computedDisabled = computed(() => {
        return props.disabled || props.loading
      })

      watch(checked, () => {
        inputEl.value.checked = checked.value
        if(props.activeColor || props.inactiveColor) {
          setBackgroundColor()
        }
      })

      if ([props.activeValue, props.inactiveValue].includes(props.modelValue)) {
        ctx.emit('update:modelValue', props.inactiveValue)
        ctx.emit('change', props.inactiveValue)
      }

      // methods
      const handleChange = () => {
        const val = checked.value ? props.inactiveValue : props.activeValue
        ctx.emit('update:modelValue', val)
        ctx.emit('change', val)

        nextTick(() => {
          inputEl.value.checked = val
        })
      }
      const switchValue = () => {
        if(computedDisabled.value) return
        handleChange()
      }
      const setBackgroundColor = () => {
        const color = checked.value ? props.activeColor : props.inactiveColor
        panelEl.value.style.borderColor = color
        panelEl.value.style.backgroundColor = color
        // panelEl.value.children[0].style.color = color
      }

      onMounted(() => {
        if (props.activeValue || props.inactiveValue) {
          setBackgroundColor()
        }
        inputEl.value.checked = checked.value
      })

      return {
        inputEl, panelEl,
        computedDisabled,
        checked,
        handleChange,
        switchValue
      }
    }
  })
</script>
