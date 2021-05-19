import { Ref, computed } from 'vue'

interface IProps {
  duration: number,
  offset: number,
  zIndex: number,
  icon?: String,
  type: string
}

const _iconTypeMap = {
  success: 'check-circle',
  warning: 'alert-circle',
  error: 'x-circle',
  default: 'info'
}

const useOverlay = (
  props: IProps,
  timer: number | null,
  visible: Ref<boolean>
) => {

  const startTimer = () => {
    if (props.duration > 0) {
      timer = setTimeout(() => {
        if (visible.value) {
          close()
        }
      }, props.duration)
    }
  }

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  const close = () => {
    visible.value = false
  }

  const customStyle = computed(() => ({
    top: `${props.offset}px`,
    zIndex: props.zIndex
  }))

  const iconName = computed(() => {
    if (props.icon) return props.icon

    return _iconTypeMap[props.type]
  })

  return {
    startTimer,
    clearTimer,
    close,

    customStyle,
    iconName
  }
}

export default useOverlay
