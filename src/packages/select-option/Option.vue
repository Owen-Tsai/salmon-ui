<template>
  <li
    :class="[
      'sui-select__option',
      disabled ? 'is-disabled' : '',
      divided ? 'is-divided': '',
      itemSelected ? 'is-selected' : ''
    ]"
    @click="handleClick"
  >
    <span ref="labelSpanEl">
      <slot>{{ renderedLabel }}</slot>
    </span>
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

  export default defineComponent({
    name: 'SOption',
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

      // injected
      const selectComponent:any = inject('select')

      let itemSelected = ref(false)

      const handleClick = () => {
        selectComponent.handleOptionClick({
          'label': renderedLabel.value,
          'value': props.value
        })

        ctx.emit('click')
      }

      const isOptionSelected = (): boolean => {
        if(
          selectComponent.props.limit > 1 &&
          Array.isArray(selectComponent.props.modelValue)
        ) {
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
        handleClick
      }
    }
  })
</script>
