<template>
  <li
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

      const renderedLabel = computed(() => {
        if(!ctx.slots.default) {
          return props.label ? props.label.toString() : props.value
        } else {
          return labelSpanEl.value?.innerText
        }
      })
      const isMultipleSelect = computed(() => {
        return selectComponent.props.multiple
      })
      const optionDisabled = computed(() => {
        if(
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
      const selectComponent:any = inject('select')

      const handleClick = () => {
        if(optionDisabled.value) return

        selectComponent.handleOptionClick({
          'label': renderedLabel.value,
          'value': props.value
        })

        ctx.emit('click')
      }

      const isOptionSelected = computed(():boolean => {
        if(isMultipleSelect.value) {
          return selectComponent.props.modelValue.includes(props.value)
        } else {
          return isEqual(selectComponent.props.modelValue, props.value)
        }
      })

      onMounted(() => {
        if(selectComponent.props.modelValue && isOptionSelected.value) {
          handleClick()
        }
      })

      return {
        labelSpanEl,
        renderedLabel,
        isOptionSelected,
        optionDisabled,
        isMultipleSelect,
        handleClick
      }
    }
  })
</script>
