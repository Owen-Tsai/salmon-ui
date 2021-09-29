<template>
  <div class="sui-select">
    <!-- reference -->
    <s-input
      v-if="!searchable"
      ref="referenceEl"
      class="sui-select__input"
      v-model="renderedLabel"
      :placeholder="placeholder"
      readonly
      :disabled="disabled"
    >
      <template #suffix>
        <s-icon ref="suffixEl">
          <arrow-down-s></arrow-down-s>
        </s-icon>
      </template>
      <template #prefix v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
    </s-input>

    <s-input
      v-else
      ref="referenceEl"
      class="sui-select__input"
      v-model="searchInputValue"
      :placeholder="searchInputPlaceholder"
      @composition:start="handleComposition('start')"
      @composition:end="handleComposition('end')"
      @focus="handleInputFocus"
    >
      <template #prefix v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
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
  import ClassName from '@/utils/className.tippy'

  import {
    triggerType,
    themeType,
    dropdownPopperConfig
  } from '@/utils/popper-options'

  import SInput from '../input'
  import SIcon from '../icon'
  import { ArrowDownS } from '@salmon-ui/icons'

  import isEqual from 'lodash/isEqual'

  import {
    IOption,
    ISelectProvider,
    OptionValue
  } from './select.type'

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
      const searchInputValue = ref('')
      const searchInputPlaceholder = ref('')
      const isInputComposing = ref(false)

      const selected = props.multiple ? ref<IOption[]>([]) : ref<IOption>()
      const selectedValues = ref<OptionValue[]>([])
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
        if (props.searchable) {
          if (!searchInputValue.value || !validateInputValue()) {
            searchInputValue.value = renderedLabel.value
          }
        }
      }
      const handleShow = () => {
        suffixEl.value.$el.classList.add('select-suffix-rotate')
      }
      const validateInputValue = () => {
        const optionEls: HTMLElement[] = popperEl.value.querySelector('.sui-select__option')
        for (let i = 0; i < optionEls.length; i++) {
          if (optionEls[i].innerHTML === searchInputValue.value) {
            return true
          }
        }

        return false
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

          if (props.searchable) {
            searchInputPlaceholder.value = str
            searchInputValue.value = str
          }

          renderedLabel.value = str
        } else if(!Array.isArray(selected.value)) {
          const val = selected.value ?
            String(selected.value.label) || String(selected.value.value) : ''
          if (props.searchable) {
            searchInputPlaceholder.value = val
            searchInputValue.value = val
          }

          renderedLabel.value = val
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

      const handleInputFocus = () => {
        searchInputValue.value = ''
      }
      const handleComposition = (state: 'start' | 'end') => {
        isInputComposing.value = state === 'start'
      }

      const options = {
        hideOnClick: true,
        trigger: triggerType('click'),
        theme: themeType('light'),
        interactive: true,
        onHide: handleHide,
        onShow: handleShow,
      }

      onMounted(() => {
        if(referenceEl.value) {
          tippyInstance = tippy(referenceEl.value.$el, {
            ...options, ...dropdownPopperConfig, ...{
              content: popperEl.value,
              placement: 'bottom',
              plugins: [sticky, ClassName],
              sticky: true,
              classes: ['sui-popper--select'],
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
        handleOptionClick,
        searchInputValue,
        isInputComposing
      } as ISelectProvider))

      return {
        selected,
        renderedLabel,
        menuWidth,
        referenceEl, popperEl, suffixEl,
        handleOptionClick,
        searchInputValue,
        searchInputPlaceholder,
        handleInputFocus,
        handleComposition
      }
    }
  })
</script>
