<template>
  <div
    class="sui-tab-item"
    v-show="visible"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    watch,
    inject,
    onMounted
  } from 'vue'

  import {
    ITabsProvider
  } from '../tabs/tabs.type'

  export default defineComponent({
    name: 'STabItem',
    props: {
      name: String
    },
    setup(props) {
      const visible = ref(false)

      const {
        activeName
      } = inject('tabs', {} as Partial<ITabsProvider>)

      const toggleVisibility = (val) => {
        visible.value = val === props.name
      }

      watch(() => activeName?.value, (val) => {
        toggleVisibility(val)
      })

      onMounted(() => {
        toggleVisibility(activeName?.value)
      })

      return {
        visible
      }
    }
  })
</script>
