<template>
  <transition name="slide-up">
    <div
      v-show="visible"
      ref="alertEl"
      :class="cls"
    >
      <div class="sui-alert__wrapper">
        <div class="sui-alert__icon">
          <s-icon :name="computedIcon" />
        </div>

        <div class="sui-alert__content">
          <div
            v-if="title || $slots.title"
            class="sui-alert__title"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <div
            v-if="$slots.default || !!content"
            class="sui-alert__message"
          >
            <slot>
              {{ content }}
            </slot>
          </div>
        </div>

        <div
          v-if="$slots.action"
          class="sui-alert__action"
        >
          <slot name="action" />
        </div>

        <button
          v-if="dismissable"
          class="sui-alert__close-btn"
          @click.prevent="close"
        >
          <s-icon
            class="sui-alert__close-token"
            :name="Close"
          />
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import {
  computed,
  ref,
  getCurrentInstance,
  PropType,
  Component
} from 'vue'
import {
  Close,
  InformationFill,
  ErrorWarningFill,
  CheckboxCircleFill,
} from '@salmon-ui/icons'
import SIcon from '../icon'

const props = defineProps({
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'error'>,
    default: 'primary'
  },
  dismissable: Boolean,
  title: {
    type: String,
    default: undefined
  },
  content: {
    type: String,
    default: undefined
  },
  icon: {
    type: Object as PropType<Component>,
    default: undefined
  },
  outlined: Boolean
})

const emit = defineEmits(['close'])

const cls = computed(() => [
  'sui-alert',
  `sui-alert--${props.type}`,
  {
    'is-outlined': props.outlined,
    'has-title': props.title || getCurrentInstance()?.slots.title
  }
])

const alertEl = ref<HTMLElement>()
const visible = ref(true)

const computedIcon = computed(() => {
  if (props.icon) return props.icon
  switch (props.type) {
    case 'primary':
      return InformationFill
    case 'success':
      return CheckboxCircleFill
    default:
      return ErrorWarningFill
  }
})

const close = () => {
  emit('close')
  const el = alertEl.value as HTMLElement
  el.style.height = `${el.offsetHeight}px`
  el.style.height = `${el.offsetHeight}px`
  visible.value = false
}
</script>
