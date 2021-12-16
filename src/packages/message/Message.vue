<template>
  <transition
    name="sui-message"
    @before-leave="onClose"
    @after-leave="onDestroy"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[
        'sui-message',
        `sui-message--${type}`,
        customClass
      ]"
      role="alert"
      :style="customStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <slot name="icon" v-if="showIcon">
        <s-icon v-if="!icon" class="sui-message__icon">
          <checkbox-circle-fill v-if="type === 'success'"></checkbox-circle-fill>
          <alert-fill v-else-if="type === 'warning'"></alert-fill>
          <error-warning-fill v-else-if="type === 'error'"></error-warning-fill>
          <information-fill v-else></information-fill>
        </s-icon>
        <s-icon v-else class="sui-message__icon">
          <component :is="icon"></component>
        </s-icon>
      </slot>

      <p v-if="useHTML" v-html="message"></p>
      <p v-else>{{ message }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  VNode,
  ref,
  computed,
  onMounted
} from 'vue'

import SIcon from '../icon'
import {
  CheckboxCircleFill,
  AlertFill,
  ErrorWarningFill,
  InformationFill
} from '@salmon-ui/icons'

import {
  MessageType,
} from './message.type'

import useTimer from '@/utils/use-overlay-timer'

export default defineComponent({
  name: 'SMessage',
  components: {
    SIcon,
    CheckboxCircleFill,
    AlertFill,
    ErrorWarningFill,
    InformationFill
  },
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    },
    customClass: String,
    useHTML: Boolean,
    duration: {
      type: Number,
      default: 3000
    },
    message: String,
    offset: {
      type: Number,
      default: 24
    },
    zIndex: {
      type: Number,
      default: 0
    },
    onClose: {
      type: Function as PropType<() => void>,
      default: undefined
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    icon: Object as PropType<VNode | (() => VNode)>,
    id: String
  },
  emits: ['destroy'],
  setup(props, {emit}) {
    // data
    const visible = ref(false)
    let timer: number | null = null

    // computed
    const customStyle = computed(() => ({
      top: `${props.offset}px`,
      zIndex: props.zIndex
    }))

    // methods
    const {
      startTimer,
      clearTimer,
      close,
    } = useTimer(props, timer, visible)

    const onDestroy = () => {
      emit('destroy')
    }

    // hooks
    onMounted(() => {
      startTimer()
      visible.value = true
    })

    return {
      visible,
      customStyle,

      startTimer,
      clearTimer,
      onDestroy,
      close
    }
  }
})
</script>
