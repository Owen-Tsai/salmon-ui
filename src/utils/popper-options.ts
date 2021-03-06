const basePopperConfig = {
  animation: 'scale-subtle',
  inertia: true,
  appendTo: () => document.body,

}

export const triggerType = (trigger: string) => {
  switch (trigger) {
    case 'hover':
      return 'mouseenter'
    case 'click':
      return 'click'
    case 'focus':
      return 'focusin'
  }
}

export default basePopperConfig
