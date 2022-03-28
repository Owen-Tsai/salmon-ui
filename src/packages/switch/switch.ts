import type {
  Component,
  PropType
} from 'vue'

export const props = {
  disabled: Boolean,
  activeText: String,
  activeIcon: Object as PropType<Component>,
  activeColor: String,
  activeValue: {
    type: [String, Boolean, Number],
    default: true
  },
  inactiveText: String,
  inactiveIcon: Object as PropType<Component>,
  inactiveColor: String,
  inactiveValue: {
    type: [String, Boolean, Number],
    default: false
  },
  name: String,
  loading: Boolean,
  modelValue: {
    type: [String, Boolean, Number],
    default: false
  },
  minWidth: Number
}
