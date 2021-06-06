import { Ref } from 'vue'

export interface ITabsProvider {
  handleTabClick: (name: string) => void,
  activeName: Ref<string>,
  tabStyle: Ref<CSSStyleDeclaration>
}
