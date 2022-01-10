import { buildProp } from '@/utils/props'

const props = {
  type: buildProp({
    type: String,
    values: ['success', 'warning', 'error']
  } as const),
  dot: Boolean,
  max: buildProp({
    type: Number,
    default: 99
  } as const),
  value: [String, Number],
  top: Number,
  right: Number
}

export default props