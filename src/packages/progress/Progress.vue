<template>
  <div
    :class="[
      'sui-progress',
      type ? `is-${type}` : null
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- linear -->
    <div
      v-if="!type"
      :class="['sui-progress--linear', {
        'is-active': status === 'active'
      }]"
    >
      <div class="sui-progress__bar">
        <div class="sui-progress__track"></div>
        <div
          class="sui-progress__fill"
          :style="linearFillStyle"
        ></div>
      </div>
      <div class="sui-progress__info">
        <slot>
          <span>{{ percentage }}%</span>
        </slot>
      </div>
    </div>

    <!-- circular and dashboard -->
    <div
      v-else
      :class="`sui-progress--${type}`"
      :style="{ height: `${size}px`, width: `${size}px` }"
    >
      <div class="sui-progress__bar">
        <svg viewBox="0 0 100 100">
          <path
            class="sui-progress__track"
            :d="trackPath"
            stroke="#e8e8e8"
            :stroke-width="relativeStrokeWidth"
            fill="none"
            :style="trackPathStyle"
          ></path>
          <path
            class="sui-progress__fill"
            :d="trackPath"
            :stroke="strokeColor || '#2563eb'"
            fill="none"
            stroke-linecap="round"
            :stroke-width="percentage ? relativeStrokeWidth : 0"
            :style="fillPathStyle"
          ></path>
        </svg>
      </div>
      <div class="sui-progress__info">
        <slot>
          <span>{{ percentage }}%</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import {
  props,
  useCommonAttrs,
  useLinearProgress,
  useNonLinearProgress
} from './progress'

export default defineComponent({
  name: 'SProgress',
  props,
  setup(props) {
    const { strokeColor } = useCommonAttrs(props)

    const {
      fillStyle: linearFillStyle
    } = useLinearProgress(props, strokeColor)

    const {
      fillPathStyle,
      trackPath,
      trackPathStyle,
      relativeStrokeWidth
    } = useNonLinearProgress(props)

    return {
      strokeColor,
      linearFillStyle,
      fillPathStyle,
      trackPath,
      trackPathStyle,
      relativeStrokeWidth
    }
  }
})
</script>
