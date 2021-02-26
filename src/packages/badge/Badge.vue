<template>
  <div class="sui-badge" :class="`sui-badge--${type}`">
    <slot></slot>

    <transition name="zoom-in-center">
      <sup
        v-show="!hidden && (computedValue || dot)"
        class="sui-badge__content"
        :class="{ 'is-dot': dot }"
        v-text="computedValue"
        :style="posStyle"
      ></sup>
    </transition>
  </div>
</template>

<script>
  import { defineComponent, computed } from 'vue'

  const _types = ['default', 'success', 'warning', 'error']

  export default defineComponent({
    name: 'SBadge',
    props: {
      type: {
        type: String,
        default: 'default',
        validator: (v) => {
          return _types.includes(v)
        }
      },
      dot: Boolean,
      max: {
        type: Number,
        default: 99
      },
      hidden: Boolean,
      value: [String, Number],
      top: Number,
      right: Number
    },
    setup(props) {
      const computedValue = computed(() => {
        if(props.dot) {
          return
        }
        if(typeof props.value === 'number') {
          return props.value > props.max ? `${props.max}+` : props.value
        }

        return props.value
      })

      const posStyle = computed(() => {
        const style = {}

        if(props.top) {
          style.top = `${props.top}px`
        }
        if(props.right) {
          style.right = `${props.right}px`
        }

        return style
      })

      return {
        computedValue, posStyle
      }
    }
  })
</script>
