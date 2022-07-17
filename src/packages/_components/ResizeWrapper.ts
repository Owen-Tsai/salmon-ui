import {
  defineComponent,
  watch,
  onBeforeUnmount
} from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import useFirstElement from 'salmon-ui/_hooks/use-first-element'

export default defineComponent({
  name: 'ResizeWrapper',
  props: {
    watchOnUpdated: Boolean
  },
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const { children, firstElement } = useFirstElement()
    let resizeObserver: ResizeObserver | null

    const createObserver = (target: HTMLElement) => {
      resizeObserver = new ResizeObserver(
        (entries: ResizeObserverEntry[]) => {
          const entry = entries[0]
          emit('resize', entry)
        }
      )

      resizeObserver.observe(target)
    }

    const destroyObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }
    }

    watch(firstElement, (el) => {
      if (resizeObserver) {
        destroyObserver()
      }
      if (el) {
        createObserver(el)
      }
    })

    onBeforeUnmount(() => {
      destroyObserver()
    })

    return () => {
      children.value = slots.default?.()
      return children.value
    }
  }
})
