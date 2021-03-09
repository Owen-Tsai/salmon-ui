export const basePopperConfig = {
  animation: 'scale-subtle',
  inertia: true,
  appendTo: () => document.body,
}

export const dropdownPopperConfig = {
  animation: 'shift-away',
  appendTo: () => document.body
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
