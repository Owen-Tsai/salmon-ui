<template>
  <div
    :class="[
      'sui-tabs',
      {
        'is-outlined': outlined,
        'is-vertical': vertical
      }
    ]"
  >
    <div
      class="sui-tabs__header"
      ref="headerEl"
    >
      <slot name="header"></slot>

      <span
        v-if="!outlined"
        class="sui-tabs__line"
        :style="lineStyle"
      ></span>
    </div>

    <div
      class="sui-tabs__pane"
      ref="paneEl"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    computed,
    provide,
    onMounted,
    nextTick,
    watch
  } from 'vue'

  export default defineComponent({
    name: 'STabs',
    props: {
      modelValue: String,
      outlined: Boolean,
      vertical: Boolean,
      tabStyle: Object
    },
    setup(props, { emit }) {
      if (!props.modelValue) {
        console.warn('[sui-tabs] `v-model` is required.')
      }

      // data
      const activeName = ref(props.modelValue)
      const activeTabEl = ref<HTMLElement>()
      const tabStyle = ref(props.tabStyle)
      const headerEl = ref<HTMLElement>()

      // computed props
      const offsetPos = computed(() => {
        return props.vertical ?
          activeTabEl.value?.offsetTop || 0 :
          activeTabEl.value?.offsetLeft || 0
      })
      const offsetSize = computed(() => {
        return props.vertical ?
          activeTabEl.value?.offsetHeight || 0 :
          activeTabEl.value?.offsetWidth || 0
      })
      const lineStyle = computed(() => {
        const pos = offsetPos.value
        const size = offsetSize.value

        let style: Partial<CSSStyleDeclaration>

        if (props.vertical) {
          style = {
            height: `${size}px`,
            transform: `translateY(${pos}px)`
          }
        } else {
          style = {
            width: `${size}px`,
            transform: `translateX(${pos}px)`
          }
        }

        return style
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
      watch(() => props.modelValue, val => {
        if (val) {
          handleTabClick(val)
        }
      })

      provide('tabs', {
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
