<template>
  <div class="sui-badge" :class="`sui-badge--${type}`">
    <slot></slot>

    <transition name="zoom-in-center">
      <sup
        v-show="!hidden && (content || isDot)"
        class="sui-badge__content"
        :class=""
      ></sup>
    </transition>
  </div>
</template>

<script>
  import { defineComponent, ref, computed } from 'vue'

  const _types = ['default', 'success', 'warning', 'danger']

  export default defineComponent({
    name: 'SBadge',
    props: {
      type: {
        type: String,
        default: 'default',

      }
    }
  })
</script>
