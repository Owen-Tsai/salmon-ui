<template>
  <div
    class="sui-progress"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- linear -->
    <div
      v-if="type === 'linear'"
      class="sui-progress--linear"
    >
      <div class="sui-progress__bar">
        <div class="sui-progress__track"></div>
        <div class="sui-progress__fill"></div>
      </div>
      <div class="sui-progress__info">
        <span v-if="percentage !== 100">{{ percentage }}%</span>
        <s-icon
          :name="finishIcon"
        ></s-icon>
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
            :stroke="stroke"
            fill="none"
            stroke-linecap="round"
            :stroke-width="percentage ? relativeStrokeWidth : 0"
            :style="fillPathStyle"
          ></path>
        </svg>
      </div>
      <div class="sui-progress__info">
        <span v-if="percentage !== 100">{{ percentage }}%</span>
        <s-icon
          :name="finishIcon"
        ></s-icon>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    computed,
  } from 'vue'

  import SIcon from '../icon'

  type ProgressType = 'linear' | 'circular' | 'dashboard'
  type ProgressStatus = 'success' | 'error' | 'normal' | 'active'

  export default defineComponent({
    name: 'SProgress',
    components: {
      SIcon
    },
    props: {
      type: {
        type: String as PropType<ProgressType>,
        default: 'line'
      },
      status: {
        type: String as PropType<ProgressStatus>,
        default: 'normal'
      },
      percentage: {
        type: Number,
        default: 0,
        required: true
      },
      finishIcon: {
        type: String,
        default: 'check'
      },
      strokeWidth: {
        type: Number,
        default: 6
      },
      strokeCap: {
        type: String as PropType<any>
      },
      color: {
        type: String,
        default: '#0066ff'
      },
      // only available when in circular or dashboard type
      size: {
        type: Number,
        default: 128
      }
    },
    setup(props, { emit }) {
      const linearFillStyle = computed(() => {
        return {
          width: `${props.percentage}%`,
        }
      })

      const relativeStrokeWidth = computed(() => {
        return (props.strokeWidth - props.size).toFixed(1)
      })

      const radius = computed(() => {
        if (props.type === 'circular' || props.type === 'dashboard') {
          return parseInt(`${50 - parseFloat(relativeStrokeWidth.value) / 2}`, 10)
        }

        return 0
      })

      /**
       * M: starting point, absolute coordinates
       * m: starting point, dx and dy relatively to the current point
       * a: draw an arc curve
       */
      const trackPath = computed(() => {
        const r = radius.value
        const isDashboard = props.type === 'dashboard'

        return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
        `
      })

      const perimeter = computed(() => {
        return 2 * Math.PI * radius.value
      })

      const rate = computed(() => {
        return props.type === 'dashboard' ? 0.75 : 1
      })

      const strokeDashOffset = computed(() => {
        const offset = -1 * perimeter.value * (1 - rate.value) / 2
        return `${offset}px`
      })

      const trackPathStyle = computed(() => {
        return {
          strokeDasharray:
            `${(perimeter.value * rate.value)}px, ${perimeter.value}px`,
          strokeDashoffset: strokeDashOffset.value
        }
      })

      const fillPathStyle = computed(() => {
        return {
          strokeDasharray:
            `${perimeter.value * rate.value * (props.percentage / 100) }px, ${perimeter.value}px`,
          strokeDashoffset: strokeDashOffset.value,
          transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
        }
      })

      const stroke = computed(() => {
        let color
        if (props.color) {
          color =
        }
      })

      // methods
      const getCurrentColor: (percentage: number): string => {
        if (typeof props.color === 'string') {

        } else if (props.color === 'array') {
          
        }
      }

      return {
        trackPath,

        relativeStrokeWidth,

        linearFillStyle,
        trackPathStyle,
        fillPathStyle,
      }
    }
  })
</script>
