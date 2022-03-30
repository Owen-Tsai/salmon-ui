import { camelize } from '@vue/shared'

export const entries = (obj: Record<string, unknown>) => {
  return Object.keys(obj).map((key) =>
    [key, obj[key]]
  )
}

export const processSizeType = (
  propVal: string | number
): string => {
  return typeof propVal === 'string' ? propVal : `${propVal}px`
}

export const getStyle = (
  el: HTMLElement,
  styleName: string
): string => {
  styleName = camelize(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }

  const style = el.style.getPropertyValue(styleName)
  if (style) return style

  const computedStyle = window.getComputedStyle(el)
  // @ts-expect-error CSSStyleDeclaration should allow string as index
  return computedStyle[styleName] || ''
}

export const isScrollable = (
  el: HTMLElement,
  isVertical?: boolean
): RegExpMatchArray | null => {
  const determinedDirection = isVertical === null || isVertical === undefined
  const overflow = determinedDirection
    ? getStyle(el, 'overflow')
    : isVertical
      ? getStyle(el, 'overflow-y')
      : getStyle(el, 'overflow-x')

  return overflow.match(/(scroll|auto)/)
}

export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): Window | HTMLElement => {
  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScrollable(parent, isVertical)) {
      return parent
    }
    parent = parent.parentNode as HTMLElement
  }

  return parent
}

export const isInContainer = (
  el: HTMLElement,
  container: HTMLElement,
): boolean => {
  if (!el || !container) return false

  const elRect = el.getBoundingClientRect()
  let containerRect: Partial<DOMRect>

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container,
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    }
  } else {
    containerRect = container.getBoundingClientRect()
  }

  if (!containerRect) {
    return false
  } else {
    const c = containerRect as DOMRect
    return (
      elRect.top < c.bottom &&
      elRect.bottom > c.top &&
      elRect.right > c.left &&
      elRect.left < c.right
    )
  }
}

export const generateId = (): number => Math.floor(Math.random() * 10000)
