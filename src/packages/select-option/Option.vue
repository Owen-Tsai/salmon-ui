<template>
  <li
    :class="[
      'sui-select__option',
      optionDisabled ? 'is-disabled' : '',
      divided ? 'is-divided': '',
      itemSelected ? 'is-selected' : ''
    ]"
    @click="handleClick"
  >
    <span ref="labelSpanEl">
      <slot>{{ renderedLabel }}</slot>
    </span>
    <s-icon
      v-if="isMultipleSelect"
      v-show="itemSelected"
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
    watchEffect,
    onMounted
  } from 'vue'

  import SIcon from '../icon'
  import { Check } from '@salmon-ui/icons'

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
          return props.label ? props.label : props.value
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
          !itemSelected.value
        ) {
          return true
        }

        return !!props.disabled;
      })

      // injected
      const selectComponent:any = inject('select')

      let itemSelected = ref(false)

      const handleClick = () => {
        if(optionDisabled.value) return

        selectComponent.handleOptionClick({
          'label': renderedLabel.value,
          'value': props.value
        })

        ctx.emit('click')
      }

      const isOptionSelected = (): boolean => {
        if(isMultipleSelect.value) {
          return selectComponent.props.modelValue.includes(props.value)
        } else {
          return selectComponent.props.modelValue === props.value
        }
      }

      onMounted(() => {
        if(selectComponent.props.modelValue && isOptionSelected()) {
          handleClick()
          itemSelected.value = true
        }
      })

      watchEffect(() => {
        itemSelected.value = isOptionSelected()
      })

      return {
        labelSpanEl,
        renderedLabel,
        itemSelected,
        optionDisabled,
        isMultipleSelect,
        handleClick
      }
    }
  })
</script>
