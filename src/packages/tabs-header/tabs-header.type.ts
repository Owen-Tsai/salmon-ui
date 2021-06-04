import { Ref } from 'vue'

export interface ITabsHeaderProvider {
  handleTabClick: (name: string) => void,
  activeName: Ref<string>,
  tabStyle: Ref<CSSStyleDeclaration>
}
