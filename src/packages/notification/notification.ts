import { createVNode, render } from 'vue'
import NotificationConstructor from './Notification.vue'
import OverlayManager from '@/utils/overlay-manager'

import type {
  ComponentPublicInstance,
  ComponentInternalInstance
} from 'vue'

import {
  INotificationConfig,
  NotificationPosition,
  NotificationQueue,
  NotificationVm
} from './notification.type'

let seed = 1

// 4 queues has to be stored independently
// for offset to be calculated correctly
const instances: Record<NotificationPosition, NotificationQueue> = {
  'top-left': [],
  'top-right': [],
  'bottom-left': [],
  'bottom-right': []
}

// space between each instance
const _gap = 16

const Notification = function(
  options: INotificationConfig = {} as INotificationConfig
) {
  console.log('init start')
  const position = options.position || 'top-right'
  let verticalOffset = options.offset || 0

  instances[position].forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + _gap
  })

  verticalOffset += _gap

  const id = `notification_${seed++}`
  const userCloseCallback = options.onClose

  options = {
    ...options,
    id,
    onClose: () => {
      close(id, position, userCloseCallback)
    },
    offset: verticalOffset,
    zIndex: OverlayManager.nextZIndex()
  }

  const container = document.createElement('div')
  const instanceVm = createVNode(
    NotificationConstructor,
    options as any
  )

  console.log(instanceVm)

  if (instanceVm.props) {
    instanceVm.props.onDestroy = () => {
      render(null, container)
    }
  }

  render(instanceVm, container)

  instances[position].push({ vm: instanceVm })
  document.body.appendChild(container)

  console.log('init end')

  return {
    close: () => (
      instanceVm.component?.proxy as ComponentPublicInstance<{visible: boolean}>
    ).visible = false
  }
}

export const close = (
  id: string,
  position: NotificationPosition,
  userCallbackOnClose?: (vm: NotificationVm) => void
) => {
  const notifications = instances[position]
  const verticalPos = position.split('-')[0]

  const index = notifications.findIndex(({ vm }) =>
    vm.component?.props.id === id
  )

  if (index === -1) return
  const { vm } = notifications[index]

  if (!vm) return
  // call user's custom callback
  userCallbackOnClose?.(vm)

  const removedHeight = vm.el?.offsetHeight
  notifications.splice(index, 1)
  const count = notifications.length

  if (count < 1) return

  for (let i = index; i < count; i++) {
    const el = notifications[i].vm.el
    const comp = notifications[i].vm.component as ComponentInternalInstance
    comp.props.offset = parseInt(el?.style[verticalPos], 10) - removedHeight - _gap
  }
}

(['success', 'warning', 'default', 'error'] as const).forEach(type => {
  Object.assign(Notification, {
    [type]: (options: NotificationVm | INotificationConfig | string = {}) => {
      if (typeof options === 'string') {
        options = {
          content: options,
        }
      }
      options.type = type
      return Notification(options as INotificationConfig)
    },
  })
})

export const closeAll = () => {
  for (const key in instances) {
    const notifications = instances[key as NotificationPosition]
    notifications.forEach(({ vm }) => {
      (
        vm.component?.proxy as ComponentPublicInstance<{visible: boolean}>
      ).visible = false
    })
  }
}

Notification.closeAll = closeAll

export default Notification
