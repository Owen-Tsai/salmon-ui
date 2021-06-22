<template>
  <div
    :class="['sui-progress', `is-${type}`]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <!-- linear -->
    <div
      v-if="type === 'linear'"
      :class="['sui-progress--linear', {
        'is-active': status === 'active'
      }]"
    >
      <div class="sui-progress__bar">
        <div class="sui-progress__track"></div>
        <div class="sui-progress__fill" :style="linearFillStyle"></div>
      </div>
      <div class="sui-progress__info">
        <span v-if="percentage !== 100">{{ percentage }}%</span>
        <s-icon
          :name="finishIcon"
          v-else
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
          v-else
        ></s-icon>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, PropType,} from 'vue'

  import SIcon from '../icon'

  import {IProgressColor, ProgressStatus, ProgressType} from './progress.type'

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
        default: 8
      },
      strokeCap: {
        type: String as PropType<any>
      },
      color: {
        type: [String, Function, Array],
        default: '#0066ff'
      },
      // only available when in circular or dashboard type
      size: {
        type: Number,
        default: 128
      }
    },
    setup(props) {
      const linearFillStyle = computed(() => {
        return {
          width: `${props.percentage}%`,
          backgroundColor: stroke.value
        }
      })

      const relativeStrokeWidth = computed(() => {
        return (props.strokeWidth / props.size * 100).toFixed(1)
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
        if (props.status === 'error') {
          return '#d13e32'
        } else if (props.status === 'success') {
          return '#28a745'
        }

        return getCurrentColor(props.percentage)
      })

      // methods
      const getCurrentColor = (percentage: number): string => {
        if (Array.isArray(props.color)) {
          return getLeveledColor(percentage)
        } else if (typeof props.color === 'function') {
          return props.color(percentage)
        }

        return props.color as string
      }

      const getLeveledColor = (percentage: number): string => {
        const arr = getColorsArray()

        for (let i = 0; i < arr.length; i++) {
          if (arr[i].percentage > percentage) {
            return arr[i].color
          }
        }
        return arr[arr.length - 1].color
      }

      const getColorsArray = (): IProgressColor[] => {
        const colors = props.color as Array<IProgressColor | string>
        const span = 100 / colors.length
        return colors.map((obj, index) => {
          if (typeof obj === 'string') {
            return {
              color: obj,
              percentage: (index + 1) * span
            }
          }

          return obj
        })
      }

      return {
        trackPath,
        stroke,

        relativeStrokeWidth,

        linearFillStyle,
        trackPathStyle,
        fillPathStyle,
      }
    }
  })
</script>
