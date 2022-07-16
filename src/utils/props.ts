// Generate props of a component along with types and validations
import type { PropType } from 'vue'

// eslint-disable-next-line import/prefer-default-export
export function buildProp<
  T = unknown,
  R extends boolean = boolean,
  D extends T = T,
  C = never
>({
  values,
  required,
  default: defaultValue,
  type,
  validator,
}: {
  values?: readonly T[]
  required?: R
  default?: R extends true
    ? never
    : D extends Record<string, unknown> | Array<unknown>
    ? () => D
    : D
  type?: unknown
  // eslint-disable-next-line no-unused-vars
  validator?: (val: unknown) => val is C | ((v: unknown) => boolean)
} = {}) {
  return {
    type: type as PropType<T | C>,
    required: !!required,
    default: defaultValue,
    validator:
      values || validator
        ? (val: unknown) => {
          let vaild = false
          if (values) { vaild ||= ([...values, defaultValue] as unknown[]).includes(val) }
          if (validator) vaild ||= validator(val)
          return vaild
        }
        : undefined,
  } as const
}
