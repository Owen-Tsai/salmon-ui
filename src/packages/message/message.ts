import { createVNode, render } from 'vue'
import MessageConstructor from './Message.vue'
import OverlayManager from '@/utils/overlay-manager'

import type {
  ComponentPublicInstance,
  ComponentInternalInstance
} from 'vue'

import {
  IMessageConfig,
  MessageOptions,
  MessageInstanceQueue,
  MessageVM
} from './message.type'

// create unique id for each instance
let seed = 1

// all instances
let instances: MessageInstanceQueue = []

const Message = function(
  opts: MessageOptions = {} as MessageOptions
) {
  if (typeof opts === 'string') {
    opts = {
      message: opts
    }
  }

  // set offset between multiple instances
  let verticalOffset = opts.offset || 24
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + 16
  })

  verticalOffset += 16

  let options: IMessageConfig = <IMessageConfig>opts

  const id = `message_${seed++}`

  const userCallbackOnClose = options.onClose

  options = {
    ...options,
    id,
    onClose: () => {
      close(id, userCallbackOnClose)
    },
    offset: verticalOffset,
    zIndex: OverlayManager.nextZIndex()
  }

  const container = document.createElement('div')
  container.className = `container_${id}`

  const message = options.message

  const instanceVm = createVNode(
    MessageConstructor,
    options as any
  )

  if (!instanceVm.props) return
  instanceVm.props.onDestroy = () => {
    render(null, container)
  }

  render(instanceVm, container)

  instances.push({ vm: instanceVm })

  document.body.appendChild(container.firstElementChild as Element)

  return {
    close: () => (
      instanceVm.component?.proxy as ComponentPublicInstance<{visible: boolean}>
    ).visible = false
  }
}

export const close = (
  id: string,
  userCallbackOnClose?: (vm: MessageVM) => void
) => {
  let count = instances.length
  let index: number

  index = instances.findIndex(({ vm }) => {
    const _id = vm.component?.props.id
    return id === _id
  })

  if (index === -1) return

  const { vm } = instances[index]
  if (!vm) return
  userCallbackOnClose?.(vm)

  const removedHeight = vm.el?.offsetHeight
  instances.splice(index, 1)

  // re-calculate the offset amount of other instances
  if (count <= 1 || index > instances.length - 1) return

  for (let i = index; i < count - 1; i++) {
    const pos =
      parseInt(instances[i].vm.el?.style['top'], 10) - removedHeight - 16

    const comp = instances[i].vm.component as ComponentInternalInstance
    comp.props.offset = pos
  }
}

export const closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component as any
    instance.ctx.close()
  }
}

(['success', 'warning', 'default', 'error'] as const).forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type,
      }
    } else {
      options.type = type
    }
    return Message(options)
  }
})

Message.closeAll = closeAll

export default Message
