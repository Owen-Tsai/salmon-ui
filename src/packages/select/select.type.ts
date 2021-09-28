import {
  Ref
} from 'vue'

export interface IProps {
  modelValue:
    string | number | boolean | object | string[] | number[] | object[],
  placeholder: string,
  disabled: boolean,
  multiple: boolean,
  searchable: boolean,
  limit: number
}

export type OptionValue = string | number | boolean | object

export interface IOption {
  label?: string | number,
  value: OptionValue
}

export interface ISelectProvider {
  props: IProps,
  selected: Ref<IOption> | Ref<IOption[]>,
  selectedValues: Ref<OptionValue[]>,
  handleOptionClick: (option: IOption) => void,
  searchInputValue: Ref<string>,
  isInputComposing: Ref<boolean>
}
