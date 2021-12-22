import type {
  ButtonSize, ButtonType, ButtonShape
} from '@/packages/button/button.type'

export interface IButtonGroupProvider {
  type: ButtonType,
  shape: ButtonShape,
  size: ButtonSize
}
