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
          'is-focused': isFocused,
          'is-active': isActive
        }
      ]"
      role="button"
      :tabindex="disabled ? -1 : 0"
      @click="handleHeaderClick"
      @focus="handleFocus"
      @blur="isFocused = false"
      :style="customHeaderStyle"
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
        class="sui-accordion-item__content-wrapper"
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

  import {
    generateId
  } from '@/utils/utils'

  import type {
    IAccordionProvider
  } from './accordion.type'

  export default defineComponent({
    name: 'SAccordionItem',
    components: {
      SIcon,
      STransitionWrapper,
      ArrowRightS
    },
    props: {
      title: String,
      name: {
        type: [String, Number],
        required: true,
        default: () => {
          generateId()
        }
      },
      disabled: Boolean
    },
    setup(props) {
      const accordionComp = inject<IAccordionProvider>('accordion')

      // data
      const isFocused = ref(false)
      const isClick = ref(false)
      const id = ref(generateId())

      // computed
      const isActive = computed(() => {
        const names: Array<string | number> = accordionComp?.activeNames.value || []
        return names.includes(props.name)
      })

      const customHeaderStyle = computed(() => {
        if (isActive.value) {
          return accordionComp?.headerActiveStyle.value ||
            accordionComp?.headerStyle.value
        } else {
          return accordionComp?.headerStyle.value
        }
      })

      // methods
      const handleFocus = () => {
        setTimeout(() => {
          if (!isClick.value) {
            isFocused.value = true
          } else {
            isClick.value = false
          }
        }, 50)
      }

      const handleHeaderClick = () => {
        if (props.disabled) return
        accordionComp?.handleItemClick(props.name)
        isFocused.value = false
        isClick.value = true
      }

      return {
        isActive,
        isFocused,
        customHeaderStyle,

        id,

        handleFocus,
        handleHeaderClick,
      }
    }
  })
</script>
