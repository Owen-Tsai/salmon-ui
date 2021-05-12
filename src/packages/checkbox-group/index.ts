import { App } from 'vue'
import CheckboxGroup from './CheckboxGroup.vue'

CheckboxGroup.install = (app: App) => {
  app.component(CheckboxGroup.name, CheckboxGroup)
}

export default CheckboxGroup
