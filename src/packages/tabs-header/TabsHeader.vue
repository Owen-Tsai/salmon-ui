<template>
  <div
    :class="[
      'sui-tabs-header',
      `sui-tabs--${position}`,
      {
        'sui-tabs--outlined': outlined
      }
    ]"
    ref="headerEl"
  >
    <slot></slot>

    <span
      class="sui-tabs__line"
      :style="lineStyle"
    ></span>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref,
    computed,
    provide,
    onMounted,
    nextTick
  } from 'vue'

  type TabsPosition = 'top' | 'bottom' | 'left' | 'right'

  export default defineComponent({
    name: 'STabsHeader',
    props: {
      modelValue: String,
      outlined: Boolean,
      position: {
        type: String as PropType<TabsPosition>,
        default: 'top'
      },
      tabStyle: Object
    },
    setup(props, { emit }) {
      if (!props.modelValue) {
        console.warn('[sui-tab-header] `v-model` is required.')
      }

      // data
      const activeName = ref(props.modelValue)
      const activeTabEl = ref<HTMLElement>()
      const tabStyle = ref(props.tabStyle)
      const headerEl = ref<HTMLElement>()

      // computed props
      const lineStyle = computed(() => {
        const left = activeTabEl.value?.offsetLeft || 0
        const width = activeTabEl.value?.offsetWidth || 0

        return {
          width: `${width}px`,
          transform: `translateX(${left}px)`
        } as CSSStyleDeclaration
      })

      // methods
      const getActiveTabEl = () => {
        activeTabEl.value =
          headerEl.value?.querySelector('.sui-tab.is-active') as HTMLElement
      }
      const handleTabClick = (name: string) => {
        if (activeName.value === name) return
        activeName.value = name
        emit('update:modelValue', name)

        nextTick(() => {
          getActiveTabEl()
        })
      }

      provide('tabsHeader', {
        handleTabClick,
        activeName,
        tabStyle,
      })

      onMounted(() => {
        getActiveTabEl()
      })

      return {
        headerEl,
        lineStyle
      }
    }
  })
</script>
