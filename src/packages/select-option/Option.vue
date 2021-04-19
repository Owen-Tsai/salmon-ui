<template>
  <li
    :class="[
      's-select__option',
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
    ref
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

      const itemSelected = computed(() => false)

      const handleClick = () => {
        selectComponent.handleOptionClick({
          'label': renderedLabel.value,
          'value': props.value
        })
      }

      return {
        labelSpanEl,
        renderedLabel,
        itemSelected,
        handleClick
      }
    }
  })
</script>
