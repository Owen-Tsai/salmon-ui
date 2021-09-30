<template>
  <transition
    name="sui-notification"
    @before-leave="onClose"
    @after-leave="handleDestroy"
  >
    <div
      v-show="visible"
      :id="id"
      :class="[
        'sui-notification',
        `sui-notification--${type}`,
        horizontalClass,
        showIcon ? 'has-icon' : null,
        title ? 'has-title' : null,
        customClass
      ]"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
      :style="customStyle"
    >
      <slot name="icon">
        <s-icon class="sui-notification__icon" v-if="showIcon">
          <checkbox-circle-fill v-if="type === 'success'"></checkbox-circle-fill>
          <alert-fill v-else-if="type === 'warning'"></alert-fill>
          <error-warning-fill v-else-if="type === 'error'"></error-warning-fill>
          <information-fill v-else></information-fill>
        </s-icon>
      </slot>

      <div class="sui-notification__text">
        <div class="sui-notification__title" v-if="title">{{ title }}</div>
        <p v-if="!useHTML">{{ content }}</p>
        <template v-else v-html="content"></template>
      </div>

      <div
        v-if="dismissible"
        class="sui-notification__close-icon"
        @click="close"
      >
        <s-icon>
          <close></close>
        </s-icon>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    VNode,
    computed,
    ref,
    onMounted
  } from 'vue'

  import useTimer from '@/utils/use-overlay-timer'

  import {
    NotificationType,
    NotificationPosition
  } from './notification.type'

  import SIcon from '../icon'
  import {
    Close,
    CheckboxCircleFill,
    AlertFill,
    ErrorWarningFill,
    InformationFill
  } from '@salmon-ui/icons'

  export default defineComponent({
    name: 'SNotification',
    components: {
      SIcon,
      Close,
      CheckboxCircleFill,
      AlertFill,
      ErrorWarningFill,
      InformationFill
    },
    props: {
      type: {
        type: String as PropType<NotificationType>,
        default: 'default'
      },
      customClass: String,
      useHTML: Boolean,
      duration: {
        type: Number,
        default: 5000
      },
      title: String,
      content: String,
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
      showIcon: Boolean,
      icon: Object as PropType<VNode | (() => VNode)>,
      id: String,
      dismissible: {
        type: Boolean,
        default: true
      },
      position: {
        type: String as PropType<NotificationPosition>,
        default: 'top-right'
      }
    },
    emits: ['destroy'],
    setup(props, { emit }) {
      // data
      const timer: number | null = null
      const visible = ref(false)

      // computed
      const horizontalClass = computed(() => {
        return props.position.indexOf('right') > 1 ? 'right' : 'left'
      })
      const verticalProperty = computed(() => {
        return props.position.startsWith('top') ? 'top' : 'bottom'
      })
      const customStyle = computed(() => {
        return {
          [verticalProperty.value]: `${props.offset}px`,
          zIndex: props.zIndex
        }
      })

      const {
        startTimer,
        clearTimer,
        close
      } = useTimer(props, timer, visible)

      const handleDestroy = () => {
        emit('destroy')
      }

      // hooks
      onMounted(() => {
        startTimer()
        visible.value = true
      })

      return {
        startTimer,
        clearTimer,
        close,
        handleDestroy,

        customStyle,
        visible,
        horizontalClass
      }
    }
  })
</script>
