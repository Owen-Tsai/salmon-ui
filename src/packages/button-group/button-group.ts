import { ExtractPropTypes } from 'vue'
import { commonProps } from 'salmon-ui/button/button'

export const groupProps = {
  ...commonProps
}

export type ButtonGroupProps = ExtractPropTypes<typeof groupProps>

export type ButtonGroupContext = ButtonGroupProps | undefined

export const buttonGroupCtxKey = Symbol('buttonGroup')
