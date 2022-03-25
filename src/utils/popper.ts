import type {
  Props,
  LifecycleHooks
} from 'tippy.js'

export interface CustomProps {
  classes: string[]
}

export type FilteredProps = CustomProps &
  Omit<Props, keyof CustomProps | keyof LifecycleHooks>

export type ExtendedProps = FilteredProps & LifecycleHooks<FilteredProps>

import classNamePlugin from '@/utils/className.tippy'

// basic config required for every tippy instance
export const baseConfig: Partial<Props & CustomProps> = {
  arrow: false,
  interactive: true,
  inertia: true,
  plugins: [classNamePlugin],
  appendTo: document.body
}

export const convertTrigger = (raw: string): string => {
  if (raw === 'hover') {
    return 'mouseenter'
  }
  if (raw === 'focus') {
    return 'focusin'
  }
  
  return raw
}