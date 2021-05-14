/*
  Manage all overlay components/elements in the app,
  adjust z-index and other behaviors accordingly

  All overlay elements use a common modalDOM,
  and we use a stack called modalStack to track them
*/

import type {Ref} from 'vue'

interface Instance {
  closeOnModelClick: Ref<boolean>,
  closeOnESC: Ref<boolean>,
  close: () => void,
  handleClose?: () => void,
  handleAction?: (action: string) => void
}

type StackFrame = {
  id: string,
  zIndex: number,
  modalClass: string
}

interface IManager {
  getInstance: (id: string) => Instance,
  zIndex: number,
  modalDOM?: HTMLElement,
  modalFade: boolean,
  modalStack: StackFrame[],
  nextZIndex: () => number,
  register: (id: string, instance: Instance) => void,
  deregister: (id: string) => void,
  doOnModalClick: () => void,
  openModal: (
    id: string,
    zIndex: number,
    dom: HTMLElement,
    modalClass: string,
    modalFade: boolean
  ) => void,
  closeModal: (id: string) => void,
  timeout: number
}

const onTouchMove = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()
}

const onModalClick = () => {
  OverlayManager?.doOnModalClick()
}

let hasModal = false
let zIndex: number = 0

const instances = {}

const OverlayManager: IManager = {
  modalFade: true,
  modalDOM: undefined,
  zIndex,

  timeout: 200,

  getInstance: (id) => {
    return instances[id]
  },

  register: (id, instance) => {
    instances[id] = instance
  },
  deregister: (id) => {
    instances[id] = null
    delete instances[id]
  },

  nextZIndex: () => {
    return ++OverlayManager.zIndex
  },

  modalStack: [],

  doOnModalClick: () => {
    const count = OverlayManager.modalStack.length
    let topItem = OverlayManager.modalStack[count - 1]
    if (!topItem) return

    const instance = OverlayManager.getInstance(topItem.id)
    if (instance && instance.closeOnModelClick.value) {
      instance.close()
    }
  },

  openModal: function (id, zIndex, dom, modalClass, modalFade) {
    if (!id || zIndex === undefined) return

    this.modalFade = modalFade

    const modalStack = this.modalStack

    for (let i = 0; i < modalStack.length; i++) {
      const item = modalStack[i]
      if (item.id === id) {
        return
      }
    }

    const modalDOM = getModal()
    modalDOM.classList.add('sui-modal')
    if (this.modalFade && !hasModal) {
      modalDOM.classList.add('sui-modal-enter')
    }
    if (modalClass) {
      modalDOM.classList.add(modalClass)
    }

    setTimeout(() => {
      modalDOM.classList.remove('sui-modal-enter')
    }, this.timeout)

    if (dom && dom.parentNode && dom.parentNode.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
      dom.parentNode.appendChild(modalDOM)
    } else {
      document.body.appendChild(modalDOM)
    }

    if (zIndex) {
      modalDOM.style.zIndex = `${zIndex}`
    }
    modalDOM.tabIndex = 0
    modalDOM.style.display = ''

    this.modalStack.push({
      id,
      zIndex,
      modalClass,
    })
  },

  closeModal: function (id) {
    const stack = this.modalStack
    const modalDom = getModal()

    // if there are multiple modals in the stack
    // remove modal if target is the topItem in the stack
    // otherwise remove all modals above it first in the loop
    if (stack.length > 0) {
      const topItem = stack[stack.length - 1]
      if (topItem.id === id) {
        if (topItem.modalClass) {
          modalDom.classList.remove(topItem.modalClass)
        }

        stack.pop()
        if (stack.length > 0) {
          modalDom.style.zIndex = String(stack[stack.length - 1].zIndex)
        } else {
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].id === id) {
              stack.splice(i, 1)
              break
            }
          }
        }
      }

      // if there is only 1 modal in the stack
      // add transition class and remove is after timeout
      if (stack.length === 0) {
        if (this.modalFade) {
          modalDom.classList.add('v-modal-leave')
        }

        setTimeout(() => {
          if (stack.length === 0) {
            if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom)
            modalDom.style.display = 'none'

            OverlayManager.modalDOM = undefined
          }

          modalDom.classList.remove('v-modal-leave')
        }, this.timeout)
      }
    }
  }
}

// return the modal DOM or create one if there isn't
const getModal = (): HTMLElement => {
  let modalDom = OverlayManager.modalDOM
  if (modalDom) {
    hasModal = true
  } else {
    hasModal = false
    modalDom = document.createElement('div')
    OverlayManager.modalDOM = modalDom

    modalDom.addEventListener('touchmove', onTouchMove)
    modalDom.addEventListener('click', onModalClick)
  }

  return modalDom
}

Object.defineProperty(OverlayManager, 'zIndex', {
  configurable: true,
  get() {
    if (zIndex === undefined) {
      zIndex = 2000
    }

    return zIndex
  },
  set(v: number) {
    zIndex = v
  }
})

const getTopOverlay = () => {
  const count = OverlayManager.modalStack.length
  if (count > 0) {
    const topItem = OverlayManager.modalStack[count - 1]
    if (!count) return

    return OverlayManager.getInstance(topItem.id)
  }
}

// register keyboard event
window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.code === 'Escape') {
    const topOverlay = getTopOverlay()

    if (topOverlay && topOverlay.closeOnESC.value) {
      if (topOverlay.handleClose) {
        topOverlay.handleClose()
      } else if (topOverlay.handleAction) {
        topOverlay.handleAction('cancel')
      } else {
        topOverlay.close()
      }
    }
  }
})

export default OverlayManager
