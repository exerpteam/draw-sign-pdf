import type { App, Plugin } from 'vue'
import { MyComponent } from './draw-sign-pdf'

const install = (app: App) => {
  app.component(MyComponent.name, MyComponent)
}

MyComponent.install = install

export { MyComponent }
export default MyComponent as unknown as Plugin
