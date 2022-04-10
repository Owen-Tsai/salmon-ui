import { buildProp } from '@/utils/props'
import {
  ExtractPropTypes,
  PropType
} from 'vue'

export type Model = string | number | Record<string | number | symbol, unknown>

export const props = {
  modelValue: [Boolean, Array] as PropType<boolean | Model[] | Set<Model>>,
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
