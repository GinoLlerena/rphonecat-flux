var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function () {
    browserify('./src/js/main.js')
    .transform('reactify')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('dist/js'))
});


gulp.task('copy', function () {
    gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));
    gulp.src('src/phones/**/*.*')
    .pipe(gulp.dest('dist/phones'));
    gulp.src('src/images/**/*.*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('default', ['browserify', 'copy'], function () {
    return gulp.watch('src/**/*.*',['browserify','copy'])
})