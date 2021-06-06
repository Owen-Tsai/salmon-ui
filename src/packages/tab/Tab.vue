<template>
  <div
    :class="[
      'sui-tab',
      isDismissible ? 'sui-tab--dismissible' : null,
      activeName === name ? 'is-active' : null
    ]"
    :style="tabStyle"
    @click="handleClick"
  >
    <slot>
      <span class="sui-tab__label">{{ label }}</span>
    </slot>

    <span class="sui-tab__close" v-if="isDismissible">
      <s-icon name="x" @click="handleClose"></s-icon>
    </span>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    computed,
    inject
  } from 'vue'

  import {
    ITabsProvider
  } from '../tabs/tabs.type'

  import SIcon from '../icon'

  export default defineComponent({
    name: 'STab',
    components: {
      SIcon
    },
    props: {
      dismissible: Boolean,
      label: {
        type: String,
        default: ''
      },
      name: String
    },
    setup(props, { emit }) {
      // injected
      const {
        handleTabClick,
        activeName,
        tabStyle
      } = inject('tabs', {} as ITabsProvider)

      // computed
      const isDismissible = computed(() => {
        return props.dismissible
      })

      // methods
      const handleClick = () => {
        emit('click', props.name)
        handleTabClick(props.name || props.label)
      }

      const handleClose = () => {
        emit('close')
      }

      return {
        isDismissible,
        activeName,
        tabStyle,

        handleClick,
        handleClose
      }
    }
  })
</script>
