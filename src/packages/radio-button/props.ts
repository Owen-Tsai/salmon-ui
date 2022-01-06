import props from '@/packages/radio/props'
import { buildProp } from '@/utils/props'

const radioButtonProps = {
  ...props,
  size: buildProp({
    type: String,
    values: ['small', 'large']
  } as const)
}

export default radioButtonProps