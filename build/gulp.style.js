const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const prefix = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const stylus = require('gulp-stylus')

const components = require('./components.json')

const buildAllStyles = (cb) => {
  gulp.src('../src/styles/index.styl')
    .pipe(stylus())
    .pipe(prefix())
    .pipe(cleanCSS())
    .pipe(rename('salmon-ui.min.css'))
    .pipe(gulp.dest('../lib/styles'))

  cb()
}

const buildComponentsStyles = (cb) => {
  Object.keys(components).forEach(component => {
    gulp.src(`../src/styles/${component}.styl`, {
      allowEmpty: true
    }).pipe(stylus())
      .pipe(prefix())
      .pipe(cleanCSS())
      .pipe(rename(`${component}.css`))
      .pipe(gulp.dest('../lib/styles'))
  })

  cb()
}

exports.default = gulp.series(buildAllStyles, buildComponentsStyles)
