<template>
  <transition
    name="slide-fade"
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
      <s-icon
        v-if="showIcon"
        class="sui-message__icon"
        :name="iconName"
        stroke-width="2"
      ></s-icon>

      <p v-if="useHTML" v-html="message"></p>
      <p v-else>{{ message }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref,
    onMounted
  } from 'vue'

  import SIcon from '../icon'

  import {
    MessageType,
  } from './message.type'

  import useOverlay from '@/utils/use-overlay'

  export default defineComponent({
    name: 'SMessage',
    components: {
      SIcon
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
      icon: String,
      id: String
    },
    emits: ['destroy'],
    setup(props, { emit }) {
      // data
      const visible = ref(false)
      let timer: number | null = null

      // methods
      const {
        startTimer,
        clearTimer,
        close,
        customStyle,
        iconName
      } = useOverlay(props, timer, visible)

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
        iconName,

        startTimer,
        clearTimer,
        onDestroy,
        close
      }
    }
  })
</script>
