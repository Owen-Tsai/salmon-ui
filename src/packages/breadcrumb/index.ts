import { App } from 'vue'
import SBreadcrumb from './breadcrumb.vue'

SBreadcrumb.install = (app: App) => {
  app.component(SBreadcrumb.name, SBreadcrumb)
}

export default SBreadcrumb
