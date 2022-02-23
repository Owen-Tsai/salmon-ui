import * as fs from 'fs'
import * as path from 'path'

const packagesRoot = path.resolve(__dirname, 'src/packages/')

const components = []

fs.readdirSync(packagesRoot, {
  withFileTypes: true
}).filter(e => {
  e.isDirectory()
}).forEach(dir => {
  components.push({
    name: dir.name,
    path: path.join(__dirname, 'src/packages/', dir.name, 'index.ts')
  })
})

export const getBuildEntryPoints = () => {
  const input = []

  components.forEach(obj => {
    input[obj.name] = obj.path
  })

  return input
}
