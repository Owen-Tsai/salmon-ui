<template>
  <div
    ref="referenceEl"
    class="sui-select"
  >
    <!-- reference -->
    <div
      v-if="multiple"
      class="sui-select__tags"
    >
      <!-- tags -->
      <span
        v-if="Array.isArray(selected) && selected.length > 0"
        ref="tagsEl"
        class="sui-select__tags-wrapper"
      >
        <s-tag
          size="small"
          dismissible
        >
          {{ label }}
        </s-tag>
        <s-tag
          v-if="selected.length > 1"
          size="small"
        >
          + {{ selected.length - 1 }}
        </s-tag>
      </span>
      <!-- query input -->
      <input
        v-if="filterable"
        v-model="inputModel"
        :placeholder="inputPlaceholder"
        :disabled="disabled"
        :style="filterInputStyle"
      >
    </div>

    <!-- reference -->
    <s-input
      v-model="label"
      class="sui-select__input"
      :placeholder="inputPlaceholder"
      :readonly="!filterable"
      :disabled="disabled"
      @focus="onInputFocus"
      @input="onInput"
      @compositionstart="isComposing = true"
      @compositionend="isComposing = false"
      @compositionupdate="onInput"
    >
      <template #suffix>
        <s-icon class="sui-select__menu-arrow">
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

    <!-- popper -->
    <div
      ref="popperEl"
      class="sui-select__popper"
      :style="{ width: menuWidth }"
    >
      <ul class="sui-select__menu">
        <slot></slot>
        <template v-if="noOption">
          <div class="empty">
            暂无选项
          </div>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SSelect'
}
</script>

<script lang="ts" setup>
import {
  defineProps,
  defineEmits
} from 'vue'
import SInput from '../input'
import SIcon from '../icon'
import STag from '../tag'
import SOption from '../select-option'
import { ArrowDownS } from '@salmon-ui/icons'

import {
  props as selectProps,
  useSelect
} from './select'

const props = defineProps(selectProps)
const emit = defineEmits(['update:modelValue', 'change'])

const {
  handleComposition,
  handleInputFocus,
  handleTagClose,
  inputModel,
  inputPlaceholder,
  isComposing,
  onInput,
  onInputFocus,
  onInputBlur,
  label,
  noOption,
  menuWidth,
  options,
  popperEl,
  referenceEl,
  selected,
  filterInputStyle
} = useSelect(props, emit)
</script>
