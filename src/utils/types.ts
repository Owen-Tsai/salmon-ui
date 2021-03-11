import { App, Plugin } from 'vue'

export const SFCWithInstall = <T>(component: T) => {
  const c = component as any
  c.install = (app: App) => {
    app.component(c.name, component)
  }

  return component as T & Plugin
}
