<template>
  <div
    :class="[
      'sui-rating',
      readonly ? 'is-readonly' : null
    ]"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuetext="text"
    :aria-valuemin="0"
    :aria-valuemax="max"
    tabindex="0"
  >
    <span
      v-for="(item, key) in max"
      :key="key"
      class="sui-rating__item"
      @mousemove="handleMouseMove(item, $event)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(item)"
    >
      <s-icon
        class="sui-rating__icon"
        :style="getItemStyle(item)"
      >
        <component :is="icon"></component>
      </s-icon>
      <s-icon
        v-if="showDecimalIcon(item)"
        class="sui-rating__icon-decimal"
        :color="activeColor"
        :style="decimalIconStyle"
      >
        <component :is="icon"></component>
      </s-icon>
    </span>

    <slot v-if="showRatings">
      <span
        v-show="currentValue !== 0"
        class="sui-rating__text"
      >{{ text }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SIcon from 'salmon-ui/icon'
import {
  props,
  useRating,
  useEvents,
  useStyles
} from './rating'

export default defineComponent({
  name: 'SRating',
  components: {
    SIcon
  },
  props,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const {
      currentValue,
      decimalValue, 
      hoverIndex,
      isPointingAtHalf,
      text,
      showDecimalIcon
    } = useRating(props)

    const {
      decimalIconStyle,
      getItemStyle
    } = useStyles(props, decimalValue, currentValue)

    const {
      handleClick,
      handleMouseLeave,
      handleMouseMove
    } = useEvents(
      props,
      emit,
      currentValue,
      isPointingAtHalf,
      hoverIndex
    )

    return {
      text,
      currentValue,
      decimalIconStyle,

      showDecimalIcon,
      getItemStyle,
      handleMouseMove,
      handleMouseLeave,
      handleClick
    }
  }
})
</script>
