<template>
  <div
    class="sui-image"
    ref="containerEl"
    :style="$attrs.style"
  >
    <slot v-if="isLoading" name="placeholder">
      <div class="sui-image__placeholder" v-if="loadingText">{{ loadingText }}</div>
    </slot>

    <slot v-else-if="hasLoadError" name="error">
      <div class="sui-image__error" v-if="errorText">{{ errorText }}</div>
    </slot>

    <img
      v-else
      :class="[
        'sui-image__img',
        { 'is-clickable': previewMode }
      ]"
      v-bind="attrs"
      :src="src"
      :alt="alt"
      :style="computedStyle"
      @click="handleClick"
    >

    <teleport to="body" :disabled="!appendToBody">
      <template v-if="previewMode">
        <s-image-viewer
          v-if="isViewerVisible"
          :z-index="zIndex"
          :initial-index="imageIndex"
          :src-list="previewSrcList"
          :hide-on-click-mask="hideOnClickMask"
          @close="closeViewer"
        ></s-image-viewer>
      </template>
    </teleport>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    ref,
    Ref,
    computed,
    watch,
    onMounted,
    onBeforeUnmount,
    nextTick
  } from 'vue'

  import SImageViewer from '../image-viewer'

  import throttle from 'lodash/throttle'
  import useAttrs from '@/utils/use-attrs'

  import {
    getScrollContainer,
    isInContainer
  } from '@/utils/utils'

  const _fitOptions = [
    'cover', 'contain', 'none', 'scale-down', 'fill', ''
  ]

  let bodyCSSOverflow = ''

  export default defineComponent({
    name: 'SImage',
    components: {
      SImageViewer
    },
    props: {
      appendToBody: Boolean,
      src: String,
      alt: String,
      fit: {
        type: String,
        validator: (v: string) => {
          return _fitOptions.includes(v)
        }
      },
      lazy: Boolean,
      scrollContainer: {
        type: [String, Object] as PropType<HTMLElement | string>,
        default: null
      },
      previewSrcList: {
        type: Array as PropType<string[]>,
        default: () => []
      },
      zIndex: Number,
      hideOnClickMask: Boolean,
      errorText: {
        type: String,
        default: '加载失败'
      },
      loadingText: String,

    },
    emits: ['error'],
    setup(props, { emit }) {
      // data
      const attrs = useAttrs() as Ref<Object>
      const hasLoadError = ref(false)
      const isLoading = ref(true)
      const isViewerVisible = ref(false)
      const containerEl = ref<HTMLElement>()

      let _scrollContainer: Element | null | Window = null
      let _lazyLoadHandler: any = null

      // computed
      const computedStyle = computed(() => {
        if (props.fit) {
          return { 'object-fit': props.fit }
        }
        return {}
      })

      const alignCenter = computed(() => {
        return props.fit !== 'fill'
      })

      const previewMode = computed(() => {
        const { previewSrcList } = props
        return Array.isArray(previewSrcList) && previewSrcList.length > 0
      })

      const imageIndex = computed(() => {
        const { src, previewSrcList } = props
        let previewIndex = 0
        const srcIndex = previewSrcList.indexOf(src as string)
        if (srcIndex >= 0) {
          previewIndex = srcIndex
        }

        return previewIndex
      })

      // methods
      const loadImage = () => {
        const attributes = attrs.value

        isLoading.value = true
        hasLoadError.value = false

        const image = new Image()
        image.onload = () => handleLoad()
        image.onerror = handleError

        // bind html attributes to the created img instance
        Object.keys(attributes).forEach(key => {
          // avoid override onload callback
          if (key.toLowerCase() === 'onload') return
          const value = attributes[key]
          image.setAttribute(key, value)
        })
        // bind src
        image.src = props.src as string
      }

      const handleLoad = () => {
        isLoading.value = false
        hasLoadError.value = false
      }

      const handleError = (e: Event | String) => {
        isLoading.value = false
        hasLoadError.value = true
        emit('error', e)
      }

      const handleLazyLoad = () => {
        if (isInContainer(
          containerEl.value as HTMLElement,
          _scrollContainer as HTMLElement
        )) {
          loadImage()
          removeLazyLoadListener()
        }
      }

      const addLazyLoadListener = () => {
        const { scrollContainer } = props

        if (typeof scrollContainer === 'string') {
          _scrollContainer = document.querySelector(scrollContainer)
        } else if (scrollContainer && scrollContainer.nodeType === 1) {
          _scrollContainer = scrollContainer
        } else {
          _scrollContainer = getScrollContainer(containerEl.value as HTMLElement)
        }

        if (_scrollContainer) {
          _lazyLoadHandler = throttle(handleLazyLoad, 200)
          _scrollContainer.addEventListener('scroll', _lazyLoadHandler)
          setTimeout(() => handleLazyLoad(), 100)
        }
      }

      const removeLazyLoadListener = () => {
        if (!_scrollContainer || !_lazyLoadHandler) return

        _scrollContainer.removeEventListener('scroll', _lazyLoadHandler)
        _scrollContainer = null
        _lazyLoadHandler = null
      }

      const handleClick = () => {
        // show preview window based on props
        if (!previewMode.value) return

        // prevent body scroll when previewMode is on
        bodyCSSOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        isViewerVisible.value = true
      }

      const closeViewer = () => {
        document.body.style.overflow = bodyCSSOverflow
        isViewerVisible.value = false
      }

      // watchers
      watch(() => props.src, () => {
        loadImage()
      })

      // hooks
      onMounted(() => {
        if (props.lazy) {
          nextTick(addLazyLoadListener)
        } else {
          loadImage()
        }
      })

      onBeforeUnmount(() => {
        if (props.lazy) {
          removeLazyLoadListener()
        }
      })

      return {
        attrs,
        isLoading,
        isViewerVisible,
        hasLoadError,
        containerEl,

        computedStyle,
        alignCenter,
        previewMode,
        imageIndex,

        handleClick,
        closeViewer,
      }
    }
  })
</script>
