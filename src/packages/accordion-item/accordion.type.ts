import { Ref, ComputedRef } from 'vue'

export interface IAccordionProvider {
  activeNames: Ref<string [] | number[]>,
  handleItemClick: (name: string | number) => void,
  headerStyle: ComputedRef<CSSStyleDeclaration>,
  headerActiveStyle: ComputedRef<CSSStyleDeclaration>,
  bodyStyle: ComputedRef<CSSStyleDeclaration>,
}
