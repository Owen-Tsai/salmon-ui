<template>
  <a
    :href="disabled ? undefined : href"
    :class="cls"
    @click="onClick"
  >
    <span
      v-if="$slots.icon || icon !== false"
      class="sui-link__icon"
    >
      <slot name="icon">
        <s-icon :name="iconName" />
      </slot>
    </span>

    <slot />
  </a>
</template>

<script lang="ts" setup>
import type {
  PropType,
  Component
} from 'vue'
import { computed } from 'vue'
import SIcon from 'salmon-ui/icon'
import { Links } from '@salmon-ui/icons'

const props = defineProps({
  href: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'error'>,
    default: 'primary'
  },
  icon: {
    type: [Boolean, Object] as PropType<boolean | Component>,
    default: false
  },
  hover: {
    type: String as PropType<'underline' | 'background'>,
    default: 'underline'
  },
  disabled: Boolean
})

const emit = defineEmits(['click'])

const cls = computed(() => [
  'sui-link',
  `sui-link--${props.type}`,
  `has-${props.hover}`,
  {
    'is-disabled': props.disabled,
    'has-icon': props.icon
  }
])

const iconName = computed(() => {
  if (!props.icon) return undefined
  if (typeof props.icon !== 'boolean') {
    return props.icon
  }

  return Links
})

const onClick = () => {
  emit('click')
}
</script>
