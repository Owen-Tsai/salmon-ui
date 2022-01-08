import { buildProp } from '@/utils/props'
import { ExtractPropTypes } from 'vue'

const props = {
  modelValue: [Boolean, Array, Object],
  disabled: Boolean,
  name: String,
  min: Number,
  max: Number,
  size: buildProp({
    type: String,
    values: ['small', 'large']
  }as const)
}

export type CheckboxGroupProps = ExtractPropTypes<typeof props>

export default props