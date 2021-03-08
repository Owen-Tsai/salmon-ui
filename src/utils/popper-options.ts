export const basePopperConfig = {
  animation: 'scale-subtle',
  inertia: true,
  appendTo: () => document.body,
}

export const triggerType = (trigger: any) => {
  switch (trigger) {
    case 'hover':
      return 'mouseenter'
    case 'click':
      return 'click'
    case 'focus':
      return 'focusin'
    default:
      return 'mouseenter'
  }
}

export const hidePopper = (id: number) => {
  const ref = document.querySelector(`#popper-${id}`)
  // @ts-ignore
  const instance = ref._tippy
  instance.hide()
}
