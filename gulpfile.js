const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

gulp.task('build', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest("lib"));
});

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
    .pipe(watch('src/**/*.js'))
    .pipe(babel())
    .pipe(gulp.dest("lib"));
});

