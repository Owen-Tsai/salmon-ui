import { App } from 'vue'
import SIcon from './Icon.vue'

SIcon.install = (app: App) => {
  app.component(SIcon.name, SIcon)
}

export default SIcon
