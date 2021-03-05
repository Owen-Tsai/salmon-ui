import { App } from 'vue'
import SRadio from './Radio.vue'

SRadio.install = (app: App) => {
  app.component(SRadio.name, SRadio)
}

export default SRadio
