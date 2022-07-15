import {
  PropType,
  Component,
} from 'vue'
import { buildProp } from '@/utils/props'

/**
 * `commonProps` will be used in button-groups
 * to define props of all buttons inside a group at the same time
 */
export const commonProps = {
  type: buildProp({
    values: ['primary', 'outlined', 'text', 'default'],
    default: 'default'
  } as const),
  size: buildProp({
    values: ['large', 'small', 'mini', 'medium'],
    default: 'medium'
  } as const),
  shape: buildProp({
    values: ['circle', 'rounded', 'square'],
    default: 'square'
  } as const),
}

const props = {
  ...commonProps,
  nativeType: buildProp({
    type: String,
    default: 'button'
  } as const),
  icon: {
    type: Object as PropType<Component>,
    default: undefined
  },
  href: String,
  disabled: Boolean,
  loading: Boolean,
  autofocus: Boolean,
  danger: Boolean,
  block: Boolean
}

export default props
