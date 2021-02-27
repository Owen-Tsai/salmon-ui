<template>
  <span class="sui-breadcrumb-item">
    <span
      class="sui-breadcrumb-item__content"
      :class="{'is-link': to}"
      ref="item"
    >
      <slot></slot>
    </span>

    <s-icon
      class="sui-breadcrumb-item__separator"
      :name="separateIcon" v-if="separateIcon"
      stroke-width="2.5"
    ></s-icon>
    <span v-else class="sui-breadcrumb-item__separator">{{ separator }}</span>
  </span>
</template>
<script>
  import {
    defineComponent,
    inject,
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
    },
    setup(props) {
      const parentProps = inject('props')
      const item = ref(null)
      const componentInstance = getCurrentInstance()
      const router = componentInstance.appContext.config.globalProperties.$router

      onMounted(() => {
        item.value.setAttribute('role', 'link')
        item.value.addEventListener('click', () => {
          if(!props.to || !router) return
          router.push(props.to)
        })
      })

      return {
        item,
        separator: parentProps?.separator,
        separateIcon: parentProps?.separateIcon
      }
    }
  })
</script>
