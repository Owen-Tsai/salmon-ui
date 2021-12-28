// Generate props of a component along with types and validations
import type { PropType } from 'vue'

export const buildProp = <T = any, R extends boolean = boolean, D extends T = T>({
  type, values, required, defaultValue, validator
}: {
  type?: any,
  values?: readonly T[],
  required?: R,
  defaultValue?: R extends true ? never : D extends Record<string, unknown> | Array<any> ? () => D : D,
  validator?: (val: any) => boolean
} = {}) => {
  return {
    type: type as PropType<T | never>,
    required: !!required,
    default: defaultValue,
    validator: (val: any) => {
      let valid = false
      if (values) {
        valid ||= [...values, defaultValue].includes(val)
      }
      if (validator) {
        valid ||= validator(val)
      }

      return valid
    }
  } as const
}
