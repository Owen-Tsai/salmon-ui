import { buildProp } from '@/utils/props'
import type {
  ExtractPropTypes
} from 'vue'

const props = {
  title: String,
  name: buildProp<string | number>({
    type: [String, Number],
    required: true,
  }),
  disabled: Boolean
}

export type Model = ExtractPropTypes<typeof props>['name']

export default props