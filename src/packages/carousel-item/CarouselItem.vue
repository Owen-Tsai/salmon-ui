<template>
  <div class="swiper-slide sui-carousel__item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'SCarouselItem',
})
</script>
