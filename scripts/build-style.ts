import * as gulp from 'gulp'
import clean from 'gulp-clean-css'
import prefix from 'gulp-clean-css'
import rename from 'gulp-rename'
import stylus from 'gulp-stylus'

const buildStyles = (cb: any) => {
  gulp.src('../src/styles/index.styl')
    .pipe(stylus())
    .pipe(prefix())
    .pipe(clean())
    .pipe(rename('salmon-ui.min.css'))
    .pipe(gulp.dest('../dist/styles'))

  cb()
}

export default gulp.series(buildStyles)
