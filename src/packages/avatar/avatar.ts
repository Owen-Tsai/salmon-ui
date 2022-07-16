import { PropType } from 'vue'
import { buildProp } from '@/utils/props'

export const commonProps = {
  size: buildProp({
    type: [String, Number] as PropType<string | number>,
    values: ['large', 'medium', 'small'],
    validator: (val: unknown): val is number => typeof val === 'number',
    default: 'medium'
  } as const),
  shape: buildProp({
    values: ['circle', 'square'],
    default: 'square'
  } as const),
  fit: buildProp({
    values: ['cover', 'contain', 'scale-down', 'fill', 'none'],
    default: undefined
  } as const),
  autoFontSize: Boolean
}

export const avatarProps = {
  ...commonProps,
  src: {
    type: String,
    default: undefined
  },
  srcSet: {
    type: String,
    default: undefined
  },
  alt: {
    type: String,
    default: undefined
  }
}
