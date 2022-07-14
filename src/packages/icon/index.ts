import { App } from 'vue'
import Icon from './Icon.vue'

Icon.install = (app: App) => {
  app.component('SIcon', Icon)
}

export default Icon
