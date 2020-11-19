var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css')
var clean = require('gulp-clean')
var browserSync = require('browser-sync').create()
var rename = require('gulp-rename');
var purgecss = require('gulp-purgecss');
var htmlreplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');
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

// Purging unused CSS
gulp.task('purgecss', () => {
    return gulp.src('dist/css/style.min.css')
        .pipe(purgecss({
            content: ['dist/**/*.html']
        }))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('inject-min-css', function(done) {
  gulp.src('./dist/**/*.html')
    .pipe(htmlreplace({
        'css': 'css/style.min.css'
    }))
    .pipe(gulp.dest('./dist'));
         done();
});

// minifies HTML
gulp.task('minify-html', () => {
  return gulp.src('dist/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('dist'));
});
