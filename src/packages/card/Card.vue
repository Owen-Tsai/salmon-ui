<template>
  <div :class="[
    'sui-card', `sui-card--shadow-${shadow}`
  ]">
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
  import {
    defineComponent,
    PropType
  } from 'vue'

  type CardShadowOption = 'hover' | 'never' | 'always'

  export default defineComponent({
    name: 'SCard',
    props: {
      title: String,
      shadow: {
        type: String as PropType<CardShadowOption>,
        default: 'never',
        validator: (v: string) => {
          return ['hover', 'never', 'always'].includes(v)
        }
      },
      bodyStyle: {
        type: Object,
        default: { padding: '24px' } as Object
      }
    }
  })
</script>
