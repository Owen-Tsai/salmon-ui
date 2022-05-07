export interface IDropdownContext {
  onItemCreated: (s: ItemProxy) => void,
  commandHandler: (cmd: string) => void,
  setHighlightedItem: (s: ItemProxy) => void
}

export type ItemProxy = {
  highlighted: boolean,
  disabled: boolean,
  handleClick: () => void
}