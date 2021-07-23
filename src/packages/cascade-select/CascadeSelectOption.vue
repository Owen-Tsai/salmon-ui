<template>
  <li
    :class="[
      'sui-cascade-select__option',
      {
        'is-disabled': optionDisabled,
        'is-selected': optionSelected
      }
    ]"
  >
    <slot></slot>
    <s-icon
      v-show="optionSelected"
      name="check"
    ></s-icon>
  </li>
</template>

<script lang="ts">
  import {
    defineComponent
  } from 'vue'

  import SIcon from '../icon'

  export default defineComponent({
    name: 'SCascadeOption',
    components: {
      SIcon
    },
    props: {
      disabled: Boolean,
      value: [String, Number]
    },
    setup(props, { emit }) {

    }
  })
</script>
