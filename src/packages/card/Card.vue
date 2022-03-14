<template>
  <div
    :class="[
      'sui-card',
      `sui-card--shadow-${shadow}`,
      borderless ? 'is-borderless' : null
    ]"
  >
    <div
      v-if="$slots.header || title"
      :class="headerClass"
    >
      <slot name="header">
        {{ title }}
      </slot>
    </div>

    <div :class="bodyClass">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      :class="footerClass"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { buildProp } from '@/utils/props'

export default defineComponent({
  name: 'SCard',
  props: {
    title: {
      type: String,
      default: undefined
    },
    shadow: buildProp({
      type: String,
      values: ['hover', 'never', 'always'],
      default: 'hover',
    } as const),
    bodyClass: {
      type: String,
      default: 'sui-card__body'
    },
    headerClass: {
      type: String,
      default: 'sui-card__header'
    },
    footerClass: {
      type: String,
      default: 'sui-card__footer'
    },
    borderless: Boolean
  }
})
</script>
