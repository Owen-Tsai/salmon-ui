import { ExtractPropTypes } from 'vue'
import { commonProps } from '../avatar/avatar'

export type GroupContext = ExtractPropTypes<typeof commonProps> | undefined

export const groupCtxKey = Symbol('avatarGroup')

export const groupProps = {
  ...commonProps,
  offset: Number
}
