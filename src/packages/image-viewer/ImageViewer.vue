<template>
  <transition name="viewer-fade">
    <div
      class="sui-image-viewer__wrapper"
      ref="wrapperEl"
      tabindex="-1"
      :style="{ zIndex }"
    >
      <div
        class="sui-image-viewer__mask"
        @click.self="handleMaskClick"
      ></div>

      <!-- close icon -->
      <span
        class="sui-image-viewer__btn sui-image-viewer__close"
        @click="hide"
      >
        <s-icon>
          <close></close>
        </s-icon>
      </span>

      <!-- arrows -->
      <template v-if="!isSingle">
        <span
          :class="[
            'sui-image-viewer__btn',
            'sui-image-viewer__prev',
            { 'is-disabled': !infinite && isFirst }
          ]"
          @click="toPrev"
        >
          <s-icon>
            <arrow-left-s></arrow-left-s>
          </s-icon>
        </span>
        <span
          :class="[
            'sui-image-viewer__btn',
            'sui-image-viewer__next',
            { 'is-disabled': !infinite && isLast }
          ]"
          @click="toNext"
        >
          <s-icon>
            <arrow-right-s></arrow-right-s>
          </s-icon>
        </span>
      </template>

      <!-- actions -->
      <div class="sui-image-viewer__actions sui-image-viewer__btn">
        <s-icon @click="handleActions('zoomOut')">
          <zoom-out></zoom-out>
        </s-icon>
        <s-icon @click="handleActions('zoomIn')">
          <zoom-in></zoom-in>
        </s-icon>
        <s-icon
          class="is-divided"
          @click="toggleMode"
        >
          <fullscreen v-show="mode.icon === 'maximize'"></fullscreen>
          <fullscreen-exit v-show="mode.icon === 'minimize'"></fullscreen-exit>
        </s-icon>
        <s-icon @click="handleActions('anticlockwise')">
          <anticlockwise></anticlockwise>
        </s-icon>
        <s-icon @click="handleActions('clockwise')">
          <clockwise></clockwise>
        </s-icon>
      </div>

      <!-- preview panel -->
      <div class="sui-image-viewer__panel">
        <img
          v-for="(src, i) in srcList" :key="src"
          v-show="i === index"
          class="sui-image-viewer__img"
          :src="src"
          alt="preview image"
          ref="imgEl"
          :style="imgStyle"
          @load="handleLoad"
          @error="handleError"
          @mousedown="handleMouseDown"
        >
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref,
    computed,
    watch,
    nextTick,
    onMounted
  } from 'vue'

  import SIcon from '../icon'
  import {
    Anticlockwise,
    Clockwise,
    Close,
    ZoomIn,
    ZoomOut,
    Fullscreen,
    FullscreenExit,
    ArrowLeftS,
    ArrowRightS
  } from '@salmon-ui/icons'

  import { rafThrottle } from '@/utils/utils'

  const Mode = {
    contain: {
      name: 'container',
      icon: 'maximize'
    },
    original: {
      name: 'original',
      icon: 'minimize'
    }
  }

  type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'anticlockwise' | 'clockwise'

  export default defineComponent({
    name: 'SImageViewer',
    components: {
      SIcon,
      Anticlockwise,
      Clockwise,
      Close,
      ZoomIn,
      ZoomOut,
      Fullscreen,
      FullscreenExit,
      ArrowLeftS,
      ArrowRightS
    },
    props: {
      srcList: {
        type: Array as PropType<string[] | File[]>,
        default: () => []
      },
      zIndex: {
        type: Number,
        default: 1000
      },
      initialIndex: {
        type: Number,
        default: 0
      },
      infinite: Boolean,
      hideOnClickMask: Boolean
    },
    emits: ['close', 'change'],
    setup(props, { emit }) {
      // data
      let wheelHandler: any = null
      let dragHandler: any = null

      const isLoading = ref(true)
      const index = ref(props.initialIndex)
      const wrapperEl = ref()
      const imgEl = ref()
      const mode = ref(Mode.contain)
      const transform = ref({
        scale: 1,
        rotation: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: true
      })

      // computed props
      const isSingle = computed(() => props.srcList.length <= 1)
      const isFirst = computed(() => index.value === 0)
      const isLast = computed(() => index.value === props.srcList.length - 1)
      const currentImg = computed(() => props.srcList[index.value])

      const imgStyle = computed(() => {
        const {
          scale, rotation, offsetX, offsetY, enableTransition
        } = transform.value

        const style = {
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          transition: enableTransition ? `transform .3s`: '',
          marginLeft: `${offsetX}px`,
          marginTop: `${offsetY}px`
        } as CSSStyleDeclaration

        if (mode.value.name === Mode.contain.name) {
          style.maxWidth = style.maxHeight = '100%'
        }

        return style
      })

      // methods
      const hide = () => {
        deregisterHandlers()
        emit('close')
      }

      const registerHandlers = () => {
        wheelHandler = rafThrottle((e: WheelEvent) => {
          const delta = e.deltaY
          if (delta > 0) {
            handleActions('zoomOut', {
              zoomRate: 0.05,
              enableTransition: false
            })
          } else {
            handleActions('zoomIn', {
              zoomRate: 0.05,
              enableTransition: false
            })
          }
        })

        document.addEventListener('wheel', wheelHandler)
      }

      const deregisterHandlers = () => {
        document.removeEventListener('wheel', wheelHandler)
        wheelHandler = null
      }

      const handleMaskClick = () => {
        if (props.hideOnClickMask) {
          hide()
        }
      }

      const handleLoad = () => {
        isLoading.value = false
      }

      const handleError = (e) => {
        isLoading.value = false
        e.target.alt = '加载失败'
      }

      const handleMouseDown = (e: MouseEvent) => {
        if (isLoading.value || e.button !== 0) return
        const { offsetX, offsetY } = transform.value
        const startX = e.pageX
        const startY = e.pageY
        dragHandler = rafThrottle(ev => {
          transform.value = {
            ...transform.value,
            offsetX: offsetX + ev.pageX - startX,
            offsetY: offsetY + ev.pageY - startY,
          }
        })
          document.addEventListener('mousemove', dragHandler)
          document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', dragHandler)
        })

        e.preventDefault()
      }

      const reset = () => {
        transform.value = {
          scale: 1,
          rotation: 0,
          offsetY: 0,
          offsetX: 0,
          enableTransition: false
        }
      }

      const toggleMode = () => {
        if (isLoading.value) return

        if (mode.value.name === Mode.contain.name) {
          mode.value = Mode.original
        } else {
          mode.value = Mode.contain
        }

        reset()
      }

      const toPrev = () => {
        if (isFirst.value && !props.infinite) return
        const len = props.srcList.length

        if (isFirst.value) {
          index.value = len - 1
        } else {
          index.value -= 1
        }
      }

      const toNext = () => {
        if (isLast.value && !props.infinite) return
        if (isLast.value) {
          index.value = 0
        } else {
          index.value += 1
        }
      }

      const handleActions = (action: ImageViewerAction, options = {}) => {
        if (isLoading.value) return

        const { zoomRate, rotation, enableTransition } = {
          zoomRate: 0.2,
          rotation: 90,
          enableTransition: true,
          ...options
        }

        switch (action) {
          case 'zoomIn':
            if (transform.value.scale < 4) {
              transform.value.scale = parseFloat(
                (transform.value.scale + zoomRate).toFixed(3)
              )
            }
            break
          case 'zoomOut':
            if (transform.value.scale > 0.2) {
              transform.value.scale = parseFloat(
                (transform.value.scale - zoomRate).toFixed(3)
              )
            }
            break
          case 'anticlockwise':
            transform.value.rotation -= rotation
            break
          case 'clockwise':
            transform.value.rotation += rotation
            break
        }

        transform.value.enableTransition = enableTransition
      }

      // watchers
      watch(currentImg, () => {
        nextTick(() => {
          const img: HTMLImageElement = imgEl.value
          if (img && !img.complete) {
            isLoading.value = true
          }
        })
      })

      watch(index, (val) => {
        reset()
        emit('change', val)
      })

      // hooks
      onMounted(() => {
        registerHandlers()
        wrapperEl.value?.focus?.()
      })

      return {
        // computed props
        index,
        isSingle,
        isFirst,
        isLast,
        mode,
        imgStyle,

        // methods
        hide,

        toPrev,
        toNext,
        toggleMode,

        handleActions,
        handleLoad,
        handleError,
        handleMouseDown,
        handleMaskClick
      }

    }
  })
</script>
