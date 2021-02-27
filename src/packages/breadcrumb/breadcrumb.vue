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
  import { defineComponent, provide, ref, onMounted } from 'vue'

  export default defineComponent({
    name: 'SBreadcrumb',
    props: {
      separator: {
        type: String,
        default: '/'
      },
      separateIcon: String
    },
    setup(props) {
      const breadcrumb = ref(null)

      provide('props', props)

      onMounted(() => {
        const items = breadcrumb.value.querySelectorAll('.sui-breadcrumb-item')
        if(items.length) {
          items[items.length - 1].setAttribute('aria-current', 'page')
        }
      })

      return {
        breadcrumb
      }
    }
  })
</script>
