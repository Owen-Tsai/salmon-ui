<template>
  <button
    ref="buttonEl"
    class="sui-switch"
    :class="{
      'is-disabled': isDisabled,
      'is-checked': isChecked
    }"
    :disabled="isDisabled"
    role="switch"
    type="button"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :style="{ minWidth: `${(minWidth || 48)}px` }"
    @click.prevent="switchValue"
  >
    <span
      v-if="activeText || activeIcon"
      v-show="isChecked"
      class="sui-switch__label sui-switch__label--active"
    >
      <template v-if="activeText">{{ activeText }}</template>
      <s-icon
        v-if="activeIcon"
        :name="activeIcon"
      ></s-icon>
    </span>

    <input
      ref="inputEl"
      class="sui-switch__input"
      :name="name"
      type="checkbox"
      :disabled="isDisabled"
      @change="handleChange"
    >

    <span
      v-if="inactiveText || inactiveIcon"
      v-show="!isChecked"
      class="sui-switch__label sui-switch__label--inactive"
    >
      <template v-if="inactiveText">{{ inactiveText }}</template>
      <s-icon
        v-if="inactiveIcon"
        :name="inactiveIcon"
      ></s-icon>
    </span>

    <s-icon
      v-if="loading"
      :name="Loader"
      class="sui-switch__loader rotating"
    ></s-icon>
  </button>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch,
  Ref
} from 'vue'
import SIcon from '../icon'

import { Loader } from '@salmon-ui/icons'

import {
  props
} from './switch'

export default defineComponent({
  name: 'SSwitch',
  components: {
    SIcon
  },
  props,
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    // refs
    const inputEl = ref() as Ref<HTMLInputElement>
    const buttonEl = ref() as Ref<HTMLElement>

    // states
    const isChecked = computed(() => {
      return props.modelValue === props.activeValue
    })
    const isDisabled = computed(() => {
      return props.disabled || props.loading
    })

    watch(isChecked, () => {
      inputEl.value.checked = isChecked.value
      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor()
      }
    })

    if (!~[props.activeValue, props.inactiveValue].indexOf(props.modelValue)) {
      ctx.emit('update:modelValue', props.inactiveValue)
      ctx.emit('change', props.inactiveValue)
    }

    // methods
    const handleChange = () => {
      const val = isChecked.value ? props.inactiveValue : props.activeValue
      ctx.emit('update:modelValue', val)
      ctx.emit('change', val)

      nextTick(() => {
        inputEl.value.checked = isChecked.value
      })
    }
    const switchValue = () => {
      if (isDisabled.value) return
      handleChange()
    }
    const setBackgroundColor = () => {
      buttonEl.value.style.backgroundColor = (isChecked.value
        ? props.activeColor
        : props.inactiveColor
      ) as string
    }

    onMounted(() => {
      if (props.activeValue || props.inactiveValue) {
        setBackgroundColor()
      }
      inputEl.value.checked = isChecked.value
    })

    return {
      inputEl,
      buttonEl,
      isDisabled,
      isChecked,
      handleChange,
      switchValue,
      Loader
    }
  }
})
</script>
