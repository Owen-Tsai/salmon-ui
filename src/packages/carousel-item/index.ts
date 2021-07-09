import { App } from 'vue'
import CarouselItem from './CarouselItem.vue'

CarouselItem.install = (app: App) => {
  app.component(CarouselItem.name, CarouselItem)
}

export default CarouselItem
