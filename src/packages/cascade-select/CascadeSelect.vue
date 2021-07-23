<template>
  <div class="sui-cascade-select">
    <!-- reference -->
    <s-input
      ref="referenceEl"
      class="sui-cascade-select__input"
      v-model="renderedLabel"
      :placeholder="placeholder"
      readonly
      :disabled="disabled"
      :prefix-icon="prefixIcon"
    >
      <template #suffix>
        <s-icon name="chevron-down" ref="suffixEl"></s-icon>
      </template>
    </s-input>

    <!-- popper -->
    <div
      class="sui-cascade-select__popper"
      ref="popperEl"
    >
      <ul class="syu-cascade-select__menu">
        <s-option
          v-for="option in topLvNodes" :key="option.value"
          class="sui-cascade-select__menu-item"
          :value="option.value"
        >{{ option.label || option.value }}</s-option>
      </ul>
      <ul
        class="sui-cascade-select__menu"
        v-for="(menu, i) in processedMenus" :key="`menu-${i}`"
        v-show="menu.visible"
      >
        <s-option
          v-for="option in menu.options"
          :key="`option-${option.value}`"
          :class="[
            'sui-cascade-select__menu-item',
            {
              'is-selected': option.selected
            }
          ]"
          :value="option.value"
        >{{ option.label || option.value }}</s-option>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref
  } from 'vue'

  import SInput from '../input'
  import SIcon from '../icon'
  import SOption from './CascadeSelectOption.vue'

  import {
    ICascadeDataItem,
    ProcessedData
  } from './cascade.type'

  export default defineComponent({
    name: 'SCascadeSelect',
    components: {
      SInput, SIcon,
      SOption
    },
    props: {
      disabled: Boolean,
      prefixIcon: String,
      data: {
        type: Array as PropType<ICascadeDataItem[]>,
        default: () => []
      }
    },
    setup(props, { emit }) {
      const processedData = ref<ProcessedData>([])

      const processData = (data: ICascadeDataItem[], index: number) => {
        data.forEach((item, index) => {
          processedData.value[index].push(item)

          if (item.children) {
            processData(item.children, index)
          }
        })
      }
    }
  })
</script>
