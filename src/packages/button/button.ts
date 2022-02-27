import { buildProp } from '@/utils/props'

/**
 * `commonProps` will be used in button-groups
 * to define props of all buttons inside a group at the same time
 */
export const commonProps = {
  type: buildProp({
    values: ['primary', 'outlined', 'text', 'ghost']
  } as const),
  size: buildProp({
    values: ['large', 'small']
  } as const),
  shape: buildProp({
    values: ['circle', 'rounded']
  } as const),
}

const props = {
  ...commonProps,
  nativeType: buildProp({
    type: String,
    values: ['button', 'reset', 'submit']
  } as const),
  disabled: Boolean,
  loading: Boolean,
  autofocus: Boolean,
  danger: Boolean
}

export default props