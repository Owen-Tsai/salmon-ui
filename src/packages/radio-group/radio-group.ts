import { buildProp } from '@/utils/props'
import {
  ExtractPropTypes
} from 'vue'
import type { Model } from '@/packages/radio/radio'

const props = {
  modelValue: [String, Number, Boolean],
  disabled: Boolean,
  size: buildProp({
    type: String,
    values: ['small', 'large']
  } as const),
  name: String
}

export type RadioGroupProps = ExtractPropTypes<typeof props>

export type RadioGroupContext = RadioGroupProps & {
  changeEvent: (val: Model) => void,
  group: 'radio-group'
} | undefined

export default props
