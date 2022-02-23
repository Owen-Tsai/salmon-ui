import type { Plugin, App } from 'vue'

import Button from './packages/button'
import Alert from './packages/alert'

const components = [
  Button,
  Alert
] as Plugin[]

const install = (app: App) => {
  // Object.keys(components).forEach(key => {
  //   const component = components[key as any]

  //   if (component.install) {
  //     app.use(component)
  //   }
  // })

  // return app
  components.forEach(key => {
    if (key.install) {
      app.use(key)
    }
  })

  return app
}

export default {
  install,
  version: '0.1'
}
