import { App } from 'vue'
import Carousel from './Carousel.vue'

Carousel.install = (app: App) => {
  app.component(Carousel.name, Carousel)
}

export default Carousel
