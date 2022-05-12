import { commonProps } from 'salmon-ui/button/button'
import {
  ExtractPropTypes,
  ComponentInternalInstance,
  Ref
} from 'vue'

const props = {
  ...commonProps
}

export type ButtonGroupProps = ExtractPropTypes<typeof props>

export type ButtonGroupContext = ButtonGroupProps & {
  onCreated: (v: ComponentInternalInstance) => void,
  focused: Ref<ComponentInternalInstance>
} | undefined

export default props