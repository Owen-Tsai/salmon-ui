<template>
  <span class="sui-breadcrumb-item">
    <span class="sui-breadcrumb-item__content">
      <slot></slot>
    </span>

    <s-icon
      class="sui-breadcrumb-item__separator"
      :name="separateIcon" v-if="separateIcon"
    ></s-icon>
    <span v-else class="sui-breadcrumb-item__separator">{{ separator }}</span>
  </span>
</template>
<script>
  import {
    defineComponent,
    inject,
    computed,
    ref,
    onMounted,
    getCurrentInstance
  } from 'vue'

  import SIcon from '../icon/Icon'

  export default defineComponent({
    components: { SIcon },
    props: {
      to: {
        type: [String, Object],
        default: ''
      },
      replace: Boolean
    }
  })
</script>
