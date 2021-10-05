import { App } from 'vue'
import Breadcrumb from './Breadcrumb.vue'

Breadcrumb.install = (app: App) => {
  app.component(Breadcrumb.name, Breadcrumb)
}

export default Breadcrumb
