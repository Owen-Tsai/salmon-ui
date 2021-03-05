<template>
  <transition name="slide-up">
    <div
      class="sui-alert"
      :class="[
        `sui-alert--${type}`,
        outlined ? 'is-outlined' : '',
        closing ? 'is-closing' : ''
      ]"
      v-show="visible"
      ref="alertNode"
    >
      <div class="sui-alert__wrapper">
        <s-icon
          v-if="icon" :name="icon"
          :class="[
            'sui-alert__icon', largeIcon ? 'is-large' : ''
          ]"
        ></s-icon>
        <div class="sui-alert__content">
          <div v-if="title || $slots.title" class="sui-alert__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <p v-if="$slots.default || !!message" class="sui-alert__message">
            <slot>
              {{ message }}
            </slot>
          </p>

          <div class="sui-alert__close-icon" @click="close">
            <s-icon :name="closeIcon" v-if="dismissible"></s-icon>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import { computed, ref, defineComponent } from 'vue'
  import SIcon from '../icon'

  const _types = ['success', 'warning', 'error', 'default']

  export default defineComponent({
    name: 'SAlert',
    components: {
      SIcon
    },
    props: {
      icon: String,
      type: {
        type: String,
        default: 'default',
        validator: (v: string) => {
          return _types.includes(v)
        }
      },
      outlined: Boolean,
      dismissible: {
        type: Boolean,
        default: true
      },
      closeIcon: {
        type: String,
        default: 'x'
      },
      message: String,
      title: String
    },
    emits: ['close'],
    setup(props, ctx) {
      // state
      const visible = ref(true)
      const alertNode = ref()
      const closing = ref(false)

      // computed properties
      const largeIcon = computed(() => {
        return !!((props.title || ctx.slots.title) && (props.message || ctx.slots.default));
      })

      // methods
      const close = evt => {
        evt.preventDefault()
        const dom = alertNode.value
        console.log(dom)
        dom.style.height = `${dom.offsetHeight}px`
        dom.style.height = `${dom.offsetHeight}px`
        closing.value = true
        visible.value = false
        ctx.emit('close', evt)
      }

      return {
        visible, largeIcon, close, closing,
        alertNode
      }
    }
  })
</script>
