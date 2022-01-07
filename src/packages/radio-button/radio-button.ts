import props from '@/packages/radio/radio'
import { ExtractPropTypes } from 'vue'

const radioButtonProps = {
  ...props
}

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>

export default radioButtonProps