<template>
  <div class="sui-select">
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
        :readonly="isReadonly"
        :style="filterInputStyle"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.down.prevent="highlightOption(1)"
        @keydown.up.prevent="highlightOption(-1)"
        @keydown.esc.stop.prevent="closeMenu"
        @keydown.enter.stop.prevent="selectOption"
        @keydown.delete="deletePrevTag"
        @keydown.tab="closeMenu"
      >
    </div>

    <!-- reference -->
    <s-input
      ref="referenceEl"
      v-model="label"
      class="sui-select__input"
      :placeholder="placeholder"
      :readonly="isReadonly"
      :disabled="disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.down.prevent="highlightOption(1)"
      @keydown.up.prevent="highlightOption(-1)"
      @keydown.esc.stop.prevent="closeMenu"
      @keydown.enter.stop.prevent="selectOption"
      @keydown.tab="closeMenu"
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
        <template v-if="allowCreate && filteredOptions.length <= 0">
          <s-option
            :label="inputModel"
            :value="inputModel"
          ></s-option>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SInput from '../input'
import SIcon from '../icon'
import STag from '../tag'
import SOption from '../select-option'
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
    SOption,
    ArrowDownS
  },
  props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const {
      cachedOptions,
      filteredOptions,
      handleComposition,
      handleInputFocus,
      handleTagClose,
      inputModel,
      inputPlaceholder,
      isComposing,
      label,
      menuWidth,
      options,
      popperEl,
      referenceEl,
      selected
    } = useSelect(props, emit)

    return {
      cachedOptions,
      filteredOptions,
      handleComposition,
      handleInputFocus,
      handleTagClose,
      inputModel,
      inputPlaceholder,
      isComposing,
      label,
      menuWidth,
      options,
      popperEl,
      referenceEl,
      selected,
    }
  }
})
</script>
