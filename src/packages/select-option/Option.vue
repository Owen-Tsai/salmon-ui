<template>
  <li
    v-show="isSelectSearchable ? !isOptionHidden : true"
    :class="[
      'sui-select__option',
      optionDisabled ? 'is-disabled' : '',
      divided ? 'is-divided': '',
      isOptionSelected ? 'is-selected' : ''
    ]"
    @click="handleClick"
  >
    <span ref="labelSpanEl">
      <slot>{{ renderedLabel }}</slot>
    </span>
    <s-icon
      v-if="isMultipleSelect"
      v-show="isOptionSelected"
      class="sui-option__check-icon"
    >
      <check></check>
    </s-icon>
  </li>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  inject,
  ref,
  watch,
  onMounted
} from 'vue'

import SIcon from '../icon'
import { Check } from '@salmon-ui/icons'

import isEqual from 'lodash/isEqual'

export default defineComponent({
  name: 'SOption',
  components: {
    SIcon,
    Check
  },
  props: {
    disabled: Boolean,
    divided: Boolean,
    value: {},
    label: [String, Number]
  },
  setup(props, ctx) {
    const labelSpanEl = ref<HTMLSpanElement>()
    const isOptionHidden = ref(false)

    const renderedLabel = computed((): string => {
      if (!ctx.slots.default) {
        return props.label ? props.label.toString() : String(props.value)
      } else {
        return labelSpanEl.value?.innerText || ''
      }
    })
    const isMultipleSelect = computed(() => {
      return selectComponent.props.multiple
    })
    const optionDisabled = computed(() => {
      if (
        Array.isArray(selectComponent.selected) &&
        selectComponent.selected.length >= selectComponent.props.limit &&
        selectComponent.props.limit > 0 &&
        selectComponent.props.multiple &&
        !isOptionSelected.value
      ) {
        return true
      }

      return !!props.disabled;
    })

    // injected
    const selectComponent: any = inject('select')
    const isSelectSearchable = ref(selectComponent.props.searchable)

    const handleClick = () => {
      if (optionDisabled.value) return

      selectComponent.handleOptionClick({
        'label': renderedLabel.value,
        'value': props.value
      })

      ctx.emit('click')
    }

    const isOptionSelected = computed((): boolean => {
      if (isMultipleSelect.value) {
        return selectComponent.props.modelValue.includes(props.value)
      } else {
        return isEqual(selectComponent.props.modelValue, props.value)
      }
    })

    const changeOptionVisibility = (word: string) => {
      if (selectComponent.isInputComposing) {
        isOptionHidden.value = false
        return
      }

      if (word === '') {
        isOptionHidden.value = false
        return
      }
      isOptionHidden.value = !(renderedLabel.value.includes(word))
    }

    watch(() => selectComponent.searchInputValue, val => {
      changeOptionVisibility(val)
    })

    watch(() => selectComponent.isInputComposing, val => {
      if (!val) {
        changeOptionVisibility(selectComponent.searchInputValue)
      }
    })

    onMounted(() => {
      if (selectComponent.props.modelValue && isOptionSelected.value) {
        handleClick()
      }
    })

    return {
      labelSpanEl,
      renderedLabel,
      isOptionSelected,
      optionDisabled,
      isMultipleSelect,
      isSelectSearchable,
      handleClick,
      isOptionHidden
    }
  }
})
</script>
