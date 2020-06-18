var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css')
var clean = require('gulp-clean')
var browserSync = require('browser-sync').create()
var rename = require('gulp-rename');
var reload      = browserSync.reload;

gulp.task('minify-css', () => {
  return gulp
    .src('dist/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean-dist', function() {
  return gulp.src('dist', {
      read: false
    })
    .on('error', function(err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(clean());
});

gulp.task('clean', function() {
  return gulp.src('dist/scss', {
      read: false
    })
    .on('error', function(err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(clean());
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        watch: true,
        server: {
            baseDir: "./dist"
        }
    });
        gulp.watch("dist/*.css").on('change', browserSync.reload);
        gulp.watch("dist/*.html").on('change', browserSync.reload);
});
