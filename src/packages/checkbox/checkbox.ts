import { buildProp } from '@/utils/props'
import { ExtractPropTypes } from 'vue'

const props = {
  modelValue: [String, Number, Boolean, Array],
  value: buildProp({
    type: [String, Number, Boolean],
    default: ''
  } as const),
  checkedValue: [String, Number],
  uncheckedValue: [String, Number],
  indeterminate: Boolean,
  disabled: Boolean,
  name: String
}

export type CheckboxProps = ExtractPropTypes<typeof props>

export default props