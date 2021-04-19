<template>
  <div class="sui-select">
    <!-- reference -->
    <s-input
      ref="referenceEl"
      class="sui-select__input"
      v-model="selectedLabel"
      :placeholder="placeholder"
      readonly
      :disabled="disabled"
      :prefix-icon="prefixIcon"
    >
      <template #suffix>
        <s-icon name="chevron-down" ref="suffixEl"></s-icon>
      </template>
    </s-input>

    <div
      class="sui-select__popper"
      ref="popperEl"
      :style="{ width: menuWidth }"
    >
      <ul class="sui-select__menu">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    ref,
    computed,
    onMounted,
    PropType,
    watchEffect,
    watch,
    provide,
    reactive
  } from 'vue'
  import tippy from 'tippy.js'
  import { Placement } from 'tippy.js'
  import {
    triggerType,
    themeType,
    dropdownPopperConfig
  } from '@/utils/popper-options'

  import SInput from '../input'
  import SIcon from '../icon'

  export default defineComponent({
    components: {
      SInput,
      SIcon
    },
    props: {
      modelValue: [Array, String, Number, Boolean, Object],
      placeholder: String,
      disabled: Boolean,
      prefixIcon: String,
      placement: {
        type: String as PropType<Placement>,
        default: 'bottom',
        validator: (v: string) => {
          return ['bottom', 'top'].includes(v)
        }
      },
      limit: {
        type: Number,
        default: 3
      },
    },
    setup(props) {
      // refs
      const referenceEl = ref()
      const popperEl = ref()
      const suffixEl = ref()
      const selected = ref(null)
      let tippyInstance: any = null

      const selectedLabel = ref('')

      const menuWidth = computed(() => {
        if(referenceEl.value) {
          return window.getComputedStyle(referenceEl.value.$el)['width']
        }

        return '0'
      })

      const handleHide = () => {
        suffixEl.value.$el.classList.remove('select-suffix-rotate')
      }

      const handleShow = () => {
        suffixEl.value.$el.classList.add('select-suffix-rotate')
      }

      const handleOptionClick = (option) => {
        console.log(`option clicked`, option)
        selectedLabel.value = option.label
      }

      const options = {
        placement: props.placement,
        hideOnClick: true,
        trigger: triggerType('click'),
        theme: themeType('light'),
        interactive: true,
        classes: ['sui-popper--select'],
        onHide: handleHide,
        onShow: handleShow,
      }

      onMounted(() => {
        if(referenceEl.value) {
          tippyInstance = tippy(referenceEl.value.$el, {
            ...options, ...dropdownPopperConfig, ...{
              content: popperEl.value
            }
          })
        }

        if(props.disabled) {
          tippyInstance.disable()
        }
      })

      watchEffect(() => {
        if(!tippyInstance) return
        tippyInstance.setProps({
          placement: props.placement,
        })
      })

      watch(() => props.disabled, (val) => {
        if(val) {
          tippyInstance.disable()
        } else {
          tippyInstance.enable()
        }
      })

      provide('select', reactive({
        props,
        selected,
        handleOptionClick
      }))

      return {
        selectedLabel,
        menuWidth,
        referenceEl, popperEl, suffixEl,
        handleOptionClick
      }
    }
  })
</script>
