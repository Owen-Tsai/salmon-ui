<template>
  <transition v-on="listeners">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  export default defineComponent({
    name: 'STransition',
    setup() {
      return {
        // modified from vue-2-transition

        listeners: {
          beforeEnter(el: HTMLElement) {
            el.classList.add('sui-collapse-transition')

            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom

            el.style.height = '0'
            el.style.paddingTop = '0'
            el.style.paddingBottom = '0'
          },

          enter(el: HTMLElement) {
            el.dataset.oldOverflow = el.style.overflow

            if (el.scrollHeight !== 0) {
              el.style.height = `${el.scrollHeight}px`
              el.style.paddingTop = el.dataset.oldPaddingTop as string
              el.style.paddingBottom = el.dataset.oldPaddingBottom as string
            } else {
              el.style.height = ''
              el.style.paddingTop = el.dataset.oldPaddingTop as string
              el.style.paddingBottom = el.dataset.oldPaddingBottom as string
            }

            el.style.overflow = 'hidden'
          },

          afterEnter(el: HTMLElement) {
            el.classList.remove('sui-collapse-transition')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow as string
          },

          beforeLeave(el: HTMLElement) {
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom
            el.dataset.oldOverflow = el.style.overflow
            el.style.height = el.scrollHeight + 'px'
            el.style.overflow = 'hidden'
          },

          leave(el: HTMLElement) {
            if (el.scrollHeight !== 0) {
              el.classList.add('sui-collapse-transition')
              el.style.transitionProperty = 'height'
              el.style.height = '0'
              el.style.paddingTop = '0'
              el.style.paddingBottom = '0'
            }
          },

          afterLeave(el: HTMLElement) {
            el.classList.remove('sui-collapse-transition')
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow as string
            el.style.paddingTop = el.dataset.oldPaddingTop as string
            el.style.paddingBottom = el.dataset.oldPaddingBottom as string
          }
        }
      }
    }
  })
</script>
