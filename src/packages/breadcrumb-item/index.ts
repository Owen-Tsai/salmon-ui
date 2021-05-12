import { App } from 'vue'
import BreadcrumbItem from './BreadcrumbItem.vue'

BreadcrumbItem.install = (app: App) => {
  app.component(BreadcrumbItem.name, BreadcrumbItem)
}

export default BreadcrumbItem
