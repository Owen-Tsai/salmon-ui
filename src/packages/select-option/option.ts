import {
  PropType,
  ExtractPropTypes,
  SetupContext,
  ComponentInternalInstance,
  computed,
  inject,
  ref,
  getCurrentInstance,
  watch,
  onMounted,
} from 'vue'

import {
  props as selectProps
} from 'salmon-ui/select/select'

import { buildProp } from '@/utils/props'

export type OptionModel = string
  | number
  | boolean
  | Record<string, unknown>

export type Option = {
  label: string,
  value: OptionModel,
  uniqueId?: number
}

export const props = {
  disabled: Boolean,
  divided: Boolean,
  value: buildProp<OptionModel>({
    type: [String, Number, Boolean, Object as PropType<Record<string, unknown>>],
    required: true
  } as const),
  label: String,
  uniqueId: [String, Number]
}

interface ISelectContext {
  props: ExtractPropTypes<typeof selectProps>,
  isComposing: boolean,
  selected: OptionModel | OptionModel[],
  inputModel: string,
  onOptionClick: (proxy: IOptionProxy) => void,
  onOptionCreate: (proxy: IOptionProxy) => void
}

export interface IOptionProxy {
  value: OptionModel,
  label?: string,
  renderedLabel: string,
  disabled: boolean,
  divided: boolean,
  isDisabled: boolean,
  isHidden: boolean,
  isSelected: boolean,
  uniqueId?: string,
  changeVisibility: (w: string) => void,
  onClick: () => void
}

type OptionProps = ExtractPropTypes<typeof props>

const useStates = (
  props: OptionProps,
  select: ISelectContext,
  ctx: SetupContext<'click'[]>
) => {
  const isHidden = ref(false)

  const renderedLabel = computed<string>(() => {
    if (ctx.slots.default) {
      if (typeof ctx.slots.default()[0]?.children === 'string') {
        return ctx.slots.default()[0].children as string
      }
    }
    

    return props.label || String(props.value)
  })

  const isSelected = computed(() => {
    const val = props.uniqueId ? props.uniqueId : props.value
    if (select.props.multiple) {
      return (select.selected as OptionModel[]).includes(val)
    } else {
      return (select.selected as OptionModel) === val
    }
  })

  const isDisabled = computed(() => {
    if (
      select.props.multiple &&
      select.props.limit &&
      (select.selected as OptionModel[]).length > select.props.limit &&
      !isSelected.value
    ) {
      return true
    }

    return !!props.disabled
  })

  const isFilterable = computed(() => select.props.filterable)
  const isMultipleSelect = computed(() => select.props.multiple)

  return {
    isDisabled,
    isFilterable,
    isHidden,
    isMultipleSelect,
    isSelected,
    renderedLabel
  }
}

export const useOption = (
  props: OptionProps,
  ctx: SetupContext<'click'[]>
) => {
  const select = inject('select', {} as ISelectContext)
  const vm = getCurrentInstance() as ComponentInternalInstance

  console.log(select)
  
  const {
    isHidden,
    isDisabled,
    isFilterable,
    isSelected,
    isMultipleSelect,
    renderedLabel
  } = useStates(props, select, ctx)

  const onClick = () => {
    if (props.disabled) return
    select.onOptionClick(vm.proxy as unknown as IOptionProxy)

    ctx.emit('click')
  }

  // watch(() => select.isInputComposing, val => {
  //   if (!val) {
  //     changeVisibility(select.inputModel)
  //   }
  // })

  onMounted(() => {
    select.onOptionCreate(vm.proxy as unknown as IOptionProxy)

    if (select.props.modelValue && isSelected.value) {
      onClick()
    }
  })

  return {
    isHidden,
    isDisabled,
    isFilterable,
    isSelected,
    isMultipleSelect,
    renderedLabel,
    onClick
  }
}