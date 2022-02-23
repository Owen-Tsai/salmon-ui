import { commonProps } from 'salmon-ui/button/button'
import { ExtractPropTypes } from 'vue'

const props = {
  ...commonProps
}

export type ButtonGroupProps = ExtractPropTypes<typeof props> | undefined

export default props