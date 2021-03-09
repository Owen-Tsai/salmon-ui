import { App } from 'vue'
import DropdownMenu from './DropdownMenu.vue'

DropdownMenu.install = (app: App) => {
  app.component(DropdownMenu.name, DropdownMenu)
}

export default DropdownMenu
