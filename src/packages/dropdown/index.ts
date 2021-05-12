import { App } from 'vue'
import Dropdown from './Dropdown.vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name, Dropdown)
}

export default Dropdown
