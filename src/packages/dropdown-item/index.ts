import { App } from 'vue'
import DropdownMenuItem from './DropdownItem.vue'

DropdownMenuItem.install = (app: App) => {
  app.component(DropdownMenuItem.name, DropdownMenuItem)
}

export default DropdownMenuItem
