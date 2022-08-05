import { App, Plugin } from 'vue'
import Card from './Card.vue'

Card.install = (app: App) => {
  app.component('SCard', Card)
}

export default Card as typeof Card & Plugin
