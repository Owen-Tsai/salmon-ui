import { App } from 'vue'
import STable from './Table.vue'

STable.install = (app: App) => {
  app.component(STable.name, STable)
}

export default STable
