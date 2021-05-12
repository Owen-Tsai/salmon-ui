import { App } from 'vue'
import Slider from './Slider.vue'

Slider.install = (app: App) => {
  app.component(Slider.name, Slider)
}

export default Slider
