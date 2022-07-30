import { buildProp } from '@/utils/props'

const props = {
  type: buildProp({
    type: String,
    values: ['success', 'warning', 'error', 'primary']
  } as const),
  fill: buildProp({
    type: String,
    values: ['dark', 'none']
  } as const),
  size: buildProp({
    type: String,
    values: ['large', 'small']
  } as const),
  rounded: Boolean,
  dismissible: Boolean
}

export default props
