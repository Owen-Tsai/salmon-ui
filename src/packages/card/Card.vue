<template>
  <div
    :class="[
      'sui-card',
      outlined ? 'is-outlined' : null,
      hoverable ? 'is-hoverable' : null,
    ]"
  >
    <div
      v-if="$slots.title || $slots.action || title"
      class="sui-card__header"
    >
      <span
        v-if="$slots.title || title"
        class="sui-card__title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <span
        v-if="$slots.action"
        class="sui-card__action"
      >
        <slot name="action" />
      </span>
    </div>

    <div class="sui-card__body">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="sui-card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: undefined
  },
  hoverable: Boolean,
  outlined: {
    type: Boolean,
    default: true
  }
})
</script>
