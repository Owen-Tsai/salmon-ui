<template>
  <div
    class="sui-breadcrumb"
    aria-label="Breadcrumb"
    role="navigation"
    ref="breadcrumb"
  >
    <slot></slot>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'SBreadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      },
      separateIcon: String
    },
    setup(props, ctx) {

    }
  })
</script>
