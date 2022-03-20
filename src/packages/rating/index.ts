import { App } from 'vue'
import Rating from './Rating.vue'

Rating.install = (app: App) => {
  app.component(Rating.name, Rating)
}

export default Rating
