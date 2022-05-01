<template>
  <div class="sui-select">
    <!-- reference -->
    <div
      v-if="!filterable"
      ref="referenceEl"
      class="sui-select__trigger"
    >
      <div
        v-if="multiple && Array.isArray(modelValue) && modelValue.length > 0"
        class="sui-select__tags"
      >
        <s-tag
          size="small"
          dismissible
        >
          {{ label }}
        </s-tag>
        <s-tag
          v-if="modelValue.length > 1"
          size="small"
        >
          + {{ modelValue.length - 1 }}
        </s-tag>
      </div>

      <s-input
        v-else
        v-model="label"
        class="sui-select__input"
        :placeholder="placeholder"
        readonly
        :disabled="disabled"
      >
        <template #suffix>
          <s-icon ref="suffixEl">
            <arrow-down-s></arrow-down-s>
          </s-icon>
        </template>
        <template
          v-if="$slots.prefix"
          #prefix
        >
          <slot name="prefix">
            <s-icon :name="prefixIcon"></s-icon>
          </slot>
        </template>
      </s-input>
    </div>

    <div
      v-else
      ref="referenceEl"
      class="sui-select__trigger"
    >
      <div
        v-if="multiple && Array.isArray(modelValue) && modelValue.length > 0"
        class="sui-select__tags"
      >
        <s-tag
          size="small"
          dismissible
        >
          {{ label }}
        </s-tag>
        <s-tag
          v-if="modelValue.length > 1"
          size="small"
        >
          + {{ modelValue.length - 1 }}
        </s-tag>
      </div>

      <s-input
        v-else
        ref="referenceEl"
        v-model="inputModel"
        class="sui-select__input"
        :placeholder="inputPlaceholder"
        @composition:start="handleComposition('start')"
        @composition:end="handleComposition('end')"
        @focus="handleInputFocus"
      >
        <template
          v-if="$slots.prefix"
          #prefix
        >
          <slot name="prefix"></slot>
        </template>
        <template #suffix>
          <s-icon ref="suffixEl">
            <arrow-down-s></arrow-down-s>
          </s-icon>
        </template>
      </s-input>
    </div>

    <!-- popper -->
    <div
      ref="popperEl"
      class="sui-select__popper"
      :style="{ width: menuWidth }"
    >
      <ul class="sui-select__menu">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SInput from '../input'
import SIcon from '../icon'
import STag from '../tag'
import { ArrowDownS } from '@salmon-ui/icons'

import {
  props,
  useSelect
} from './select'

export default defineComponent({
  name: 'SSelect',
  components: {
    SInput,
    SIcon,
    STag,
    ArrowDownS
  },
  props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const {
      cachedOptions,
      handleComposition,
      handleInputFocus,
      handleTagClose,
      inputModel,
      inputPlaceholder,
      isComposing,
      label,
      options,
      popperEl,
      referenceEl,
      selected
    } = useSelect(props, emit)

    return {
      cachedOptions,
      handleComposition,
      handleInputFocus,
      handleTagClose,
      inputModel,
      inputPlaceholder,
      isComposing,
      label,
      options,
      popperEl,
      referenceEl,
      selected,
      menuWidth: '100%'
    }
    // refs
  //   const referenceEl = ref<CreateComponentPublicInstance>()
  //   const popperEl = ref<HTMLElement>()
  //   const suffixEl = ref<CreateComponentPublicInstance>()
  //   const searchInputValue = ref('')
  //   const searchInputPlaceholder = ref('')
  //   const isInputComposing = ref(false)

  //   const selected = props.multiple ? ref<IOption[]>([]) : ref<IOption>()
  //   const selectedValues = ref<OptionValue[]>([])
  //   const renderedLabel = ref<string>('')

  //   let tippyInstance: any = null

  //   const menuWidth = computed(() => {
  //     if (referenceEl.value) {
  //       return window.getComputedStyle(referenceEl.value.$el)['width']
  //     }

  //     return '0'
  //   })

  //   const handleHide = () => {
  //     suffixEl.value!.$el.classList.remove('select-suffix-rotate')
  //     if (props.filterable) {
  //       if (!searchInputValue.value || !validateInputValue()) {
  //         searchInputValue.value = renderedLabel.value
  //       }
  //     }
  //   }
  //   const handleShow = () => {
  //     suffixEl.value!.$el.classList.add('select-suffix-rotate')
  //   }
  //   const validateInputValue = () => {
  //     const optionEls = popperEl.value!.querySelectorAll('.sui-select__option')!
  //     for (let i = 0; i < optionEls.length; i++) {
  //       if (optionEls[i].innerHTML === searchInputValue.value) {
  //         return true
  //       }
  //     }

  //     return false
  //   }
  //   const processSelectedValues = () => {
  //     if (!Array.isArray(selected.value)) return
  //     selectedValues.value = []
  //     selected.value.forEach((option) => {
  //       selectedValues.value.push(option.value)
  //     })
  //   }
  //   const getSelectedIndex = (option: IOption): number => {
  //     if (Array.isArray(selected.value)) {
  //       return selected.value.findIndex(el =>
  //         isEqual(el.value, option.value)
  //       )
  //     }

  //     return -1
  //   }
  //   const setSelectLabel = () => {
  //     if (props.multiple && Array.isArray(selected.value)) {
  //       let str = ''
  //       for (let i = 0; i < selected.value.length; i++) {
  //         str += String(selected.value[i].label)
  //         str += i === selected.value.length - 1 ? '' : ', '
  //       }

  //       if (props.filterable) {
  //         searchInputPlaceholder.value = str
  //         searchInputValue.value = str
  //       }

  //       renderedLabel.value = str
  //     } else if (!Array.isArray(selected.value)) {
  //       const val = selected.value ?
  //         String(selected.value.label) || String(selected.value.value) : ''
  //       if (props.filterable) {
  //         searchInputPlaceholder.value = val
  //         searchInputValue.value = val
  //       }

  //       renderedLabel.value = val
  //     }
  //   }

  //   const handleOptionClick = (option: any) => {
  //     if (!props.multiple) {
  //       if (selected.value === option) return

  //       selected.value = option

  //       ctx.emit('update:modelValue', option.value)
  //       tippyInstance?.hide()
  //     } else {
  //       const index = getSelectedIndex(option)

  //       if (!Array.isArray(selected.value)) return

  //       if (index !== -1) {
  //         selected.value?.splice(index, 1)
  //       } else {
  //         if (props.limit && selected.value.length >= props.limit) return
  //         selected.value?.push(option)
  //       }

  //       processSelectedValues()

  //       ctx.emit('update:modelValue', selectedValues.value)
  //     }
  //   }

  //   const handleInputFocus = () => {
  //     searchInputValue.value = ''
  //   }
  //   const handleComposition = (state: 'start' | 'end') => {
  //     isInputComposing.value = state === 'start'
  //   }

  //   const options = {
  //     hideOnClick: true,
  //     trigger: triggerType('click'),
  //     theme: themeType('light'),
  //     interactive: true,
  //     onHide: handleHide,
  //     onShow: handleShow,
  //   }

  //   onMounted(() => {
  //     if (referenceEl.value) {
  //       tippyInstance = tippy(referenceEl.value.$el, {
  //         ...options, ...dropdownPopperConfig, ...{
  //           content: popperEl.value,
  //           placement: 'bottom',
  //           plugins: [sticky, ClassName],
  //           sticky: true,
  //           classes: ['sui-popper--select'],
  //         }
  //       })
  //     }

  //     console.log(getCurrentInstance()?.slots?.default?.())

  //     if (props.disabled) {
  //       tippyInstance.disable()
  //     }

  //     setSelectLabel()
  //   })

  //   watch(() => props.disabled, (val) => {
  //     if (val) {
  //       tippyInstance.disable()
  //     } else {
  //       tippyInstance.enable()
  //     }
  //   })

  //   watch(() => props.modelValue, () => {
  //     setSelectLabel()
  //   })

  //   provide('select', reactive({
  //     ...toRefs(props),
  //     selected,
  //     handleOptionClick,
  //     searchInputValue,
  //     isInputComposing,
  //     onOptionCreate: () => {/* */}
  //   } as unknown as ISelectProvider))

  //   return {
  //     selected,
  //     renderedLabel,
  //     menuWidth,
  //     referenceEl, popperEl, suffixEl,
  //     handleOptionClick,
  //     searchInputValue,
  //     searchInputPlaceholder,
  //     handleInputFocus,
  //     handleComposition
  //   }
  }
})
</script>
