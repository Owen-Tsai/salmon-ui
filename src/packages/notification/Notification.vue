<template>
  <transition
    name="slide-fade"
    @before-leave="onClose"
    @after-leave="onDestroy"
  >
    <div
      v-show="visible"
      :class="[
        'sui-notification',
        `sui-notification--${type}`,
        customClass
      ]"
      @mouseenter="clearTimer()"
      @mouseleave="startTimer()"
    >
      <s-icon
        v-if="showIcon"
        :name="iconName"
        class="sui-notification__icon"
      ></s-icon>

      <div class="sui-notification__content">
        <div class="sui-notification__title">{{ title }}</div>
        <p></p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType
  } from 'vue'

  import {
    NotificationType
  } from './notification.type'

  import SIcon from '../icon'

  export default defineComponent({
    name: 'SNotification',
    components: {
      SIcon
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
      icon: String,
      id: String
    },
    emits: ['destroy'],
    setup(props) {

    }
  })
</script>
