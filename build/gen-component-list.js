/**
 * Generate a JSON list of all components
 */

const fs = require('fs')
const path = require('path')

const dirsAndFiles = fs.readdirSync('./src/packages')
const dirs = dirsAndFiles.filter(item => {
  return fs.statSync(path.resolve('./src/packages', item)).isDirectory()
})

const obj = {}
if(dirs.length > 0) {
  dirs.forEach(dir => {
    obj[dir] = `packages/${dir}/index.js`
  })
}

const json = JSON.stringify(obj)

fs.writeFileSync('./build/components.json', json)
