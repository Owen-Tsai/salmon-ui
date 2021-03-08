import { App } from 'vue'
import SCard from './Card.vue'

SCard.install = (app: App) => {
  app.component(SCard.name, SCard)
}

export default SCard
