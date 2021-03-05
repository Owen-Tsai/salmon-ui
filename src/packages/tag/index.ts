import { App } from 'vue'
import STag from './Tag.vue'

STag.install = (app: App) => {
  app.component(STag.name, STag)
}

export default STag
