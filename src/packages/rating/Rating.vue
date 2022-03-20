<template>
  <div
    :class="[
      'sui-rate',
      disabled ? 'is-disabled' : null
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
      class="sui-rate__item"
      @mousemove="handleMouseMove(item, $event)"
      @mouseleave="handleMouseLeave"
      @click="handleClick(item)"
    >
      <s-icon
        class="sui-rate__icon"
        :style="getItemStyle(item)"
      >
        <slot>
          <star-fill></star-fill>
        </slot>
      </s-icon>
      <s-icon
        v-if="showDecimalIcon(item)"
        class="sui-rate__icon-decimal"
        :color="activeColor"
        :style="decimalIconStyle"
      >
        <slot>
          <star-fill></star-fill>
        </slot>
      </s-icon>
    </span>

    <span
      v-if="showRatings && currentValue !== 0"
      class="sui-rate__text"
    >{{ text }}</span>
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

import {
  StarFill
} from '@salmon-ui/icons'

export default defineComponent({
  name: 'SRating',
  components: {
    SIcon,
    StarFill
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
