import { App } from 'vue'
import Image from './Image.vue'

Image.install = (app: App) => {
  app.component(Image.name, Image)
}

export default Image
