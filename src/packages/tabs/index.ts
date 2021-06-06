import { App } from 'vue'
import TabsHeader from './Tabs.vue'

TabsHeader.install = (app: App) => {
  app.component(TabsHeader.name, TabsHeader)
}

export default TabsHeader
