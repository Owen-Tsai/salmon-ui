import { commonProps } from '@/packages/button/button'
import { ExtractPropTypes } from 'vue'

const props = {
  ...commonProps
}

export type ButtonGroupProps = ExtractPropTypes<typeof props> | undefined

export default props