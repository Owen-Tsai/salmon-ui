import { App } from 'vue'
import SCheckboxGroup from './CheckboxGroup.vue'

SCheckboxGroup.install = (app: App) => {
  app.component(SCheckboxGroup.name, SCheckboxGroup)
}

export default SCheckboxGroup
