<template>
  <div class="sui-select">
    <!-- reference -->
    <s-input
      ref="referenceEl"
      :class="[
        'sui-select__input',
      ]"
      v-model="renderedLabel"
      :placeholder="placeholder"
      :readonly="!searchable"
      :disabled="disabled"
      :prefix-icon="prefixIcon"
      @change="handleInputChange"
    >
      <template #suffix>
        <s-icon ref="suffixEl">
          <arrow-down-s></arrow-down-s>
        </s-icon>
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
    watch,
    provide,
    reactive
  } from 'vue'

  import tippy, { sticky } from 'tippy.js'
  import {
    triggerType,
    themeType,
    dropdownPopperConfig
  } from '@/utils/popper-options'

  import SInput from '../input'
  import SIcon from '../icon'
  import { ArrowDownS } from '@salmon-ui/icons'

  import isEqual from 'lodash/isEqual'

  interface IOption {
    label?: string,
    value: any
  }

  export default defineComponent({
    components: {
      SInput,
      SIcon,
      ArrowDownS
    },
    props: {
      modelValue: [Array, String, Number, Boolean, Object],
      placeholder: String,
      disabled: Boolean,
      prefixIcon: String,
      multiple: Boolean,
      searchable: Boolean,
      limit: {
        type: Number,
        default: 0
      },
    },
    setup(props, ctx) {
      // refs
      const referenceEl = ref()
      const popperEl = ref()
      const suffixEl = ref()

      const selected = props.multiple ? ref<IOption[]>([]) : ref<IOption>()
      const selectedValues = ref<any[]>([])
      const renderedLabel = ref<string>('')

      let tippyInstance: any = null

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
      const processSelectedValues = () => {
        if(!Array.isArray(selected.value)) return
        selectedValues.value = []
        selected.value.forEach((option) => {
          selectedValues.value.push(option.value)
        })
      }
      const getSelectedIndex = (option: IOption): number => {
        if(Array.isArray(selected.value)) {
          return selected.value.findIndex(el =>
            isEqual(el.value, option.value)
          )
        }

        return -1
      }
      const setSelectLabel = () => {
        if(props.multiple && Array.isArray(selected.value)) {
          let str = ''
          for(let i = 0; i < selected.value.length; i++) {
            str += String(selected.value[i].label)
            str += i === selected.value.length - 1 ? '' : ', '
          }

          renderedLabel.value = str
        } else if(!Array.isArray(selected.value)) {
          renderedLabel.value = selected.value?.label || selected.value?.value
        }
      }

      const handleOptionClick = (option) => {
        if(!props.multiple) {
          if(selected.value === option) return

          selected.value = option

          ctx.emit('update:modelValue', option.value)
          tippyInstance?.hide()
        } else {
          const index = getSelectedIndex(option)

          if(!Array.isArray(selected.value)) return

          if(index !== -1) {
            selected.value?.splice(index, 1)
          } else {
            if(props.limit > 0 && selected.value.length >= props.limit) return
            selected.value?.push(option)
          }

          processSelectedValues()

          ctx.emit('update:modelValue', selectedValues.value)
        }
      }

      const handleInputChange = (val) => {
        console.log(val)
      }

      const options = {
        hideOnClick: true,
        plugins: [sticky],
        trigger: triggerType('click'),
        theme: themeType('light'),
        interactive: true,
        classes: ['sui-popper--select'],
        onHide: handleHide,
        onShow: handleShow,
        sticky: true
      }

      onMounted(() => {
        if(referenceEl.value) {
          tippyInstance = tippy(referenceEl.value.$el, {
            ...options, ...dropdownPopperConfig, ...{
              content: popperEl.value,
              placement: 'bottom'
            }
          })
        }

        if(props.disabled) {
          tippyInstance.disable()
        }

        setSelectLabel()
      })

      watch(() => props.disabled, (val) => {
        if(val) {
          tippyInstance.disable()
        } else {
          tippyInstance.enable()
        }
      })

      watch(() => props.modelValue, () => {
        setSelectLabel()
      })

      provide('select', reactive({
        props,
        selected, selectedValues,
        handleOptionClick
      }))

      return {
        selected,
        renderedLabel,
        menuWidth,
        referenceEl, popperEl, suffixEl,
        handleOptionClick,
        handleInputChange
      }
    }
  })
</script>
