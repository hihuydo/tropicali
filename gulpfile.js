var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')

var browserSync = require('browser-sync').create()

sass.compiler = require('node-sass');

// function to run sass
gulp.task("sass", function () {
  // we want to run "sass css/app.scss app.css --watch"
  return gulp.src("src/css/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      cleanCss({
        compatibility: 'ie8'
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

gulp.task("html", function () {
  return gulp.src("src/index.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function () {
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function () {
  return gulp.src("src/img/*")
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })

  gulp.watch("src/index.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/app.scss", ["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})


// default, run all the defined tasks
gulp.task('default', ["html", "sass", "fonts", "images", "watch"]);