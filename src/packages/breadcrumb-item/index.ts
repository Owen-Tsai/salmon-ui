import { App } from 'vue'
import SBreadcrumbItem from './BreadcrumbItem.vue'

SBreadcrumbItem.install = (app: App) => {
  app.component(SBreadcrumbItem.name, SBreadcrumbItem)
}

export default SBreadcrumbItem
