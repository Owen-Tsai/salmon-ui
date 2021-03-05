import { App } from 'vue'
import RadioGroup from './RadioGroup.vue'

RadioGroup.install = (app: App) => {
  app.component(RadioGroup.name, RadioGroup)
}

export default RadioGroup
