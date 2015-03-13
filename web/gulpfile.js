var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    react = require('gulp-react'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    console.log('Yay gulp! You might want to run the *develop* task.');
});

gulp.task('jsxgen', function() {
    return gulp.src("*/**/*.jsx")
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('develop', function() {
    nodemon({script: './bin/www', ext: "html js jsx"})
        .on('change', ['jsxgen']);
});
