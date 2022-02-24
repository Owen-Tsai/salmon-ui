import type { App } from 'vue'

import Button from './packages/button'

const components = [
  Button
]

const install = (app: App) => {
  components.forEach(component => {
    if (component.install) {
      app.use(component)
    }
  })

  return app
}

const SalmonUI = {
  version: '0.0.1',
  install,
  Button
}

export default SalmonUI
