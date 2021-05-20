import type { Ref } from 'vue'

interface IMessageProps {
  duration: number,
}

const useTimer = (
  props: IMessageProps,
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

  return {
    startTimer,
    clearTimer,
    close
  }
}

export default useTimer
