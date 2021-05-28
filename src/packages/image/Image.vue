<template>
  <div
    class="sui-image"
    :style="$attrs.style"
  >
    <slot v-if="isLoading" name="placeholder">
      <div class="sui-image__placeholder"></div>
    </slot>

    <slot v-else-if="error" name="error">
      <div class="sui-image__error">{{ errorText }}</div>
    </slot>

    <img
      v-else
      class="sui-image__img"
      v-bind="attrs"
      :src="src"
      :alt="alt"
      :style="computedStyle"
    >

    <teleport to="body" :disabled="!appendToBody">
      <template v-if="previewMode">
        <!-- TODO: image previewer component -->
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
    computed
  } from 'vue'

  import useAttrs from '@/utils/use-attrs'

  const _fitOptions = [
    'cover', 'contain', 'none', 'scale-down', 'fill', ''
  ]

  export default defineComponent({
    name: 'SImage',
    props: {
      appendToBody: Boolean,
      src: String,
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
        default: []
      },
      zIndex: Number
    },
    emits: ['error'],
    setup(props, { emit }) {
      // data
      const attrs = useAttrs() as Ref<Object>
      const hasLoadError = ref(false)
      const isLoading = ref(true)
      const imgWidth = ref(0)
      const imgHeight = ref(0)
      const isViewerVisible = ref(false)
      const container = ref<HTMLElement | null>(null)

      let _scrollContainer: HTMLElement | null = null

      // computed
      const computedStyle = computed(() => {
        if (props.fit) {
          return { 'object-fit': props.fit }
        }
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
        image.onload = e => handleLoad(e, image)
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

      const handleLoad = (e: Event, img: HTMLImageElement) => {
        isLoading.value = false
        hasLoadError.value = false
      }

      const handleError = () => {
        isLoading.value = false
        hasLoadError.value = true
      }

      const handleLazyLoad = () => {

      }

      const addLazyLoadListener = () => {
        const { scrollContainer } = props

        if (typeof scrollContainer === 'string') {
          _scrollContainer = document.querySelector(scrollContainer)
        } else if (scrollContainer && scrollContainer.nodeType === 1) {
          _scrollContainer = scrollContainer
        } else {
          _scrollContainer = getScrollContainer()
        }
      }

      const removeLazyLoadListener = () => {

      }

      return {
        attrs,
        isLoading,


        computedStyle,
        alignCenter,
        previewMode
      }
    }
  })
</script>
