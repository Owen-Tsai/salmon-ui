import { buildProp } from '@/utils/props'

const props = {
  type: buildProp({
    type: String,
    values: ['success', 'warning', 'error', 'primary'],
    default: 'primary'
  } as const),
  outlined: Boolean,
  dismissible: buildProp({
    type: Boolean,
    default: true
  } as const),
  title: String,
  content: String
}

export default props