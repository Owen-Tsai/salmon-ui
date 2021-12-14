import type {
  ButtonSize, ButtonType, ButtonShape
} from '@/packages/button/button.type'

export interface IButtonGroupProvider {
  type: ButtonType | undefined,
  shape: ButtonShape | undefined,
  size: ButtonSize | undefined
}
