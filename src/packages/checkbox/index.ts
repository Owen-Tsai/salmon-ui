import { App } from 'vue'
import SCheckbox from './Checkbox.vue'

SCheckbox.install = (app: App) => {
  app.component(SCheckbox.name, SCheckbox)
}

export default SCheckbox
