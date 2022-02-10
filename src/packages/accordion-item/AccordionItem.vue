<template>
  <div
    :class="[
      'sui-accordion-item',
      {
        'is-active': isActive,
        'is-disabled': disabled
      }
    ]"
    role="tab"
    :aria-expanded="isActive"
  >
    <div
      :id="`sui-accordion-header-${id}`"
      :class="[
        'sui-accordion-item__header',
        {
          'is-active': isActive
        },
        customHeaderClass
      ]"
      role="button"
      :tabindex="disabled ? -1 : 0"
      @click="handleHeaderClick"
    >
      <slot name="title">{{ title }}</slot>
      <s-icon class="sui-accordion-item__icon">
        <arrow-right-s></arrow-right-s>
      </s-icon>
    </div>

    <s-transition-wrapper>
      <div
        v-show="isActive"
        :id="`sui-accordion-content-${id}`"
        :class="[
          'sui-accordion-item__content-wrapper',
          customBodyClass
        ]"
        role="tabpanel"
        :aria-hidden="!isActive"
        :aria-labelledby="`sui-accordion-header-${id}`"
      >
        <div class="sui-accordion-item__content">
          <slot></slot>
        </div>
      </div>
    </s-transition-wrapper>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  ref,
  computed
} from 'vue'

import SIcon from '../icon'
import STransitionWrapper from './TransitonWrapper.vue'
import { ArrowRightS } from '@salmon-ui/icons'

import props from './accordion-item'

import {
  generateId
} from '@/utils/utils'

import type {
  AccordionCtx
} from '../accordion/accordion'

export default defineComponent({
  name: 'SAccordionItem',
  components: {
    SIcon,
    STransitionWrapper,
    ArrowRightS
  },
  props,
  setup(props) {
    const accordionCtx = inject<AccordionCtx>('accordion')!

    // data
    const id = ref(generateId())

    // computed
    const isActive = computed(() => {
      const names = accordionCtx.activeNames.value
      return names.includes(props.name)
    })

    const customHeaderClass = computed(() => {
      return accordionCtx.headerClass.value
    })

    const customBodyClass = computed(() => {
      return accordionCtx.bodyClass.value
    })

    const handleHeaderClick = () => {
      if (props.disabled) return
      accordionCtx.handleItemClick(props.name)
    }

    return {
      isActive,
      customHeaderClass,
      customBodyClass,

      id,

      handleHeaderClick,
    }
  }
})
</script>
