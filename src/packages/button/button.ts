import { buildProp } from '@/utils/props'

/**
 * `commonProps` will be used in button-groups
 * to define props of all buttons inside a group at the same time
 */
export const commonProps = {
  type: buildProp({
    type: String,
    values: ['primary', 'outlined', 'text']
  } as const),
  size: buildProp({
    type: String,
    values: ['large', 'small']
  } as const),
  shape: buildProp({
    type: String,
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