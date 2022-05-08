import { Instance } from 'tippy.js'
import { Ref } from 'vue'

export interface IDropdownContext {
  onItemCreated: (s: ItemProxy) => void,
  commandHandler: (cmd: string) => void,
  setHighlightedItem: (s: ItemProxy) => void,
  popper: Ref<Instance>
}

export type ItemProxy = {
  highlighted: boolean,
  disabled: boolean,
  handleClick: () => void
}