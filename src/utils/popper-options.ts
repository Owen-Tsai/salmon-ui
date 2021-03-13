export const basePopperConfig = {
  animation: 'scale-subtle',
  inertia: true,
}

export const dropdownPopperConfig = {
  animation: 'shift-away',
}

export const triggerType = (trigger: any) => {
  switch (trigger) {
    case 'hover':
      return 'mouseenter'
    case 'click':
      return 'click'
    case 'focus':
      return 'focusin'
    case 'manual':
      return 'manual'
    default:
      return 'mouseenter'
  }
}

export const themeType = (theme: string) => {
  if(theme === 'light') {
    return 'light-border'
  }
}
