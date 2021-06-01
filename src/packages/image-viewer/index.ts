import { App } from 'vue'
import ImageViewer from './ImageViewer.vue'

ImageViewer.install = (app: App) => {
  app.component(ImageViewer.name, ImageViewer)
}

export default ImageViewer
