<template>
  <div class="sui-card" :class="{ 'is-hoverable': hoverable }">
    <div
      v-if="$slots.header || title"
      class="sui-card__header"
    >
      <slot name="header">{{ title }}</slot>
    </div>

    <div class="sui-card__body" :style="bodyStyle">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      class="sui-card__footer"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SCard',
    props: {
      title: String,
      hoverable: Boolean,
      bodyStyle: {
        type: Object,
        default: { padding: '24px' } as Object
      }
    }
  })
</script>
