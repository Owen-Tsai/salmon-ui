export const _buttonTypes = ['default', 'primary', 'outlined', 'text'] as const
export const _buttonSizes = ['default', 'small', 'large'] as const
export const _buttonNativeTypes = ['button', 'submit', 'reset'] as const
export const _buttonShapes = ['default', 'rounded', 'circle'] as const

export type ButtonType = 'default' | 'primary' | 'outlined' | 'text'
export type ButtonSize = 'default' | 'small' | 'large'
export type ButtonShape = 'default' | 'rounded' | 'circle'
