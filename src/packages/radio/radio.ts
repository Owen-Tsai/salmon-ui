import { ExtractPropTypes } from 'vue'
import { buildProp } from '@/utils/props'

export type Model = string | number

const props = {
  name: String,
  modelValue: [String, Number, Boolean],
  value: buildProp({
    type: [String, Number, Boolean],
    default: ''
  }as const),
  disabled: Boolean
}

export type RadioProps = ExtractPropTypes<typeof props>

export default props
