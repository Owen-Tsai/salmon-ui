import { PropType } from 'vue'
import { buildProp } from '@/utils/props'

/**
 * `commonProps` will be used in button-groups
 * to define props of all buttons inside a group at the same time
 */
export const commonProps = {
  type: buildProp({
    values: ['primary', 'outlined', 'text']
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
  disabled: Boolean as PropType<boolean>,
  loading: Boolean as PropType<boolean>,
  autofocus: Boolean as PropType<boolean>,
  danger: Boolean as PropType<boolean>,
  ghost: Boolean as PropType<boolean>
}

export default props