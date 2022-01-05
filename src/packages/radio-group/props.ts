import { buildProp } from '@/utils/props'
import { generateId } from '@/utils/utils'

const props = {
  modelValue: [String, Number],
  disabled: Boolean,
  size: buildProp({
    type: String,
    values: ['small', 'large']
  }),
  name: buildProp({
    type: String,
    defaultValue: `radio-group-${generateId()}`
  })
}

export default props
