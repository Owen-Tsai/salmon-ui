<template>
  <transition name="slide-up">
    <div
      class="sui-alert"
      :class="[
        `sui-alert--${type}`,
        outlined ? 'is-outlined' : null,
        visible ? null : 'is-closing'
      ]"
      v-show="visible"
      ref="alertNode"
    >
      <div class="sui-alert__wrapper">
        <span
          v-if="$slots.prefix"
          :class="[
            'sui-alert__prefix', 'sui-alert__icon',
            largeIcon ? 'is-large' : null
          ]"
        >
          <slot name="prefix"></slot>
        </span>
        <div class="sui-alert__content">
          <div v-if="title || $slots.title" class="sui-alert__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <p v-if="$slots.default || !!content" class="sui-alert__message">
            <slot>
              {{ content }}
            </slot>
          </p>

          <button
            v-if="dismissible"
            class="sui-alert__close-btn"
            @click="close"
          >
            <slot name="close">
              <s-icon>
                <close></close>
              </s-icon>
            </slot>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  computed,
  ref,
  defineComponent
} from 'vue'

import SIcon from '../icon'
import { Close } from '@salmon-ui/icons'

import props from './alert'

export default defineComponent({
  name: 'SAlert',
  components: {
    SIcon, Close
  },
  props,
  emits: ['close'],
  setup(props, ctx) {
    // state
    const visible = ref(true)
    const alertNode = ref<HTMLElement>()

    // computed properties
    const largeIcon = computed(() => {
      return !!((props.title || ctx.slots.title) && (props.content || ctx.slots.default))
    })

    // methods
    const close = (evt: Event) => {
      evt.preventDefault()
      const dom = alertNode.value!
      dom.style.height = `${dom.offsetHeight}px`
      dom.style.height = `${dom.offsetHeight}px`
      visible.value = false
      ctx.emit('close', evt)
    }

    return {
      visible, largeIcon, close,
      alertNode
    }
  }
})
</script>
