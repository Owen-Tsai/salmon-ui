import {
  Ref,
  ComputedRef
} from 'vue'

import { Model } from '../accordion-item/accordion-item'

export type AccordionCtx = {
  activeNames: Ref<Model[]>,
  handleItemClick: (m: Model) => void,
  headerClass: ComputedRef<string>,
  bodyClass: ComputedRef<string>
}
