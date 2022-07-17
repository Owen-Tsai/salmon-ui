/* eslint-disable no-bitwise */
import {
  ComponentPublicInstance,
  VNode,
  VNodeTypes,
  Component
} from 'vue'

export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
}

export enum PatchFlags {
  TEXT = 1,
  CLASS = 2,
  STYLE = 4,
  PROPS = 8,
  FULL_PROPS = 16,
  HYDRATE_EVENTS = 32,
  STABLE_FRAGMENT = 64,
  KEYED_FRAGMENT = 128,
  UNKEYED_FRAGMENT = 256,
  NEED_PATCH = 512,
  DYNAMIC_SLOTS = 1024,
  DEV_ROOT_FRAGMENT = 2048,
  HOISTED = -1,
  BAIL = -2,
}

export const isComponentInstance = (
  value: unknown
) => (value as ComponentPublicInstance)?.$ !== undefined

export const isComponent = (
  vn: VNode,
  type?: VNodeTypes
): type is Component => Boolean(vn && vn.shapeFlag & ShapeFlags.COMPONENT)

export const isElement = (
  vn: VNode
): boolean => Boolean(vn && vn.shapeFlag & ShapeFlags.ELEMENT)

export const isArrayChildren = (
  vn: VNode,
  children: VNode['children']
): children is VNode[] => Boolean(vn && vn.shapeFlag & ShapeFlags.ARRAY_CHILDREN)

export const getNodeChildren = (
  vn: VNode
): VNode[] | undefined => {
  if (isArrayChildren(vn, vn.children)) {
    return vn.children
  }

  if (Array.isArray(vn)) {
    return vn
  }

  return undefined
}

export const getFirstElementFromChildren = (
  children: VNode[]
): HTMLElement | undefined => {
  if (children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const e = getFirstElementFromVNode(children[i])
      if (e) return e
    }
  }

  return undefined
}

export const getFirstElementFromVNode = (
  vn: VNode
): HTMLElement | undefined => {
  if (isElement(vn)) return vn.el as HTMLElement
  if (isComponent(vn)) {
    if ((vn.el as Node).nodeType === 1) {
      return vn.el as HTMLElement
    }
    if (vn.component?.subTree) {
      const e = getFirstElementFromVNode(vn.component.subTree)
      if (e) return e
    }
  } else {
    const children = getNodeChildren(vn)
    return children ? getFirstElementFromChildren(children) : undefined
  }

  return undefined
}
