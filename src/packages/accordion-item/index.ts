import { App } from 'vue'
import AccordionItem from './AccordionItem.vue'

AccordionItem.install = (app: App) => {
  app.component(AccordionItem.name, AccordionItem)
}

export default AccordionItem
