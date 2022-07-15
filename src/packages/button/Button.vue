<template>
  <template v-if="href">
    <a
      :class="cls"
      :disabled="disabled || loading"
      :autofocus="autofocus"
      :type="nativeType"
      @click="handleClick"
    >
      <span
        v-if="icon || loading || $slots.icon"
        class="sui-button-icon"
      >
        <s-icon
          v-if="loading"
          :name="Loader"
        />
        <slot
          v-else
          name="icon"
        >
          <s-icon :name="icon" />
        </slot>
      </span>

      <slot />
    </a>
  </template>
  <template v-else>
    <button
      :class="cls"
      :disabled="disabled || loading"
      :autofocus="autofocus"
      :type="nativeType"
      @click="handleClick"
    >
      <span
        v-if="icon || loading || $slots.icon"
        class="sui-button-icon"
      >
        <s-icon
          v-if="loading"
          :name="Loader"
        />
        <slot
          v-else
          name="icon"
        >
          <s-icon :name="icon" />
        </slot>
      </span>

      <slot />
    </button>
  </template>
</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  inject
} from 'vue'
import { Loader } from '@salmon-ui/icons'
import {
  ButtonGroupContext,
  buttonGroupCtxKey
} from 'salmon-ui/button-group/button-group'
import buttonProps from './button'

const props = defineProps(buttonProps)
const emit = defineEmits(['click'])
const slots = getCurrentInstance()?.slots

const group: ButtonGroupContext = inject(
  buttonGroupCtxKey,
  undefined as ButtonGroupContext
)

// computed
const computedSize = computed(() => group?.size || props.size)
const computedType = computed(() => group?.type || props.type)
const computedShape = computed(() => group?.shape || props.shape)

const cls = computed(() => [
  'sui-button',
  `sui-button--${computedType.value}`,
  `sui-button--${computedSize.value}`,
  `sui-button--${computedShape.value}`,
  {
    'is-disabled': props.disabled,
    'is-loading': props.loading,
    'is-danger': props.danger,
    'is-icon-only': slots && !slots.default && (slots.icon || props.icon),
    'is-block': props.block
  }
])

const handleClick = (evt: Event) => {
  emit('click', evt)
}
</script>
