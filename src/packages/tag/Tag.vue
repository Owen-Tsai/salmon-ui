<template>
  <span
    :class="cls"
    :style="fillStyle"
    @click="onClick"
  >
    <slot />

    <button
      v-if="dismissible"
      class="sui-tag__close-btn"
    >
      <s-icon
        class="sui-tag__close-token"
        :name="Close"
        @click.stop="onClose"
      />
    </button>
  </span>
</template>

<script lang="ts" setup>
import {
  computed,
  PropType,
  StyleValue
} from 'vue'
import SIcon from 'salmon-ui/icon'
import { Close } from '@salmon-ui/icons'

const props = defineProps({
  type: {
    type: String as PropType<
      'default' | 'primary' | 'success' | 'error' | 'warning'
    >,
    default: 'default'
  },
  shape: {
    type: String as PropType<'square' | 'rounded'>,
    default: 'square'
  },
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    default: 'medium'
  },
  outlined: Boolean,
  dismissible: Boolean,
  color: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['click', 'close'])

const cls = computed(() => [
  'sui-tag',
  `sui-tag--${props.type}`,
  `sui-tag--${props.shape}`,
  `sui-tag--${props.size}`,
  {
    'is-outlined': props.outlined
  }
])

const fillStyle = computed<StyleValue>(() => (
  props.color ? {
    backgroundColor: props.color,
    color: '#fff',
    borderColor: props.color
  } : {}
))

const onClick = () => {
  emit('click')
}

const onClose = () => {
  emit('close')
}
</script>
