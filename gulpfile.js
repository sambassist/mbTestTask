var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');
var angularFilesort = require('gulp-angular-filesort');
var notify = require('gulp-notify');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");

var isDev = true;
var isProd = false;

if (gutil.env.type === 'prod') {
    isDev = false;
    isProd = true;
}

gulp.task('stylus', function() {
    gulp.src(['src/styl/main.styl'])
        .pipe(stylus({
            'include css': true
        }))
        .pipe(prefix())
        .pipe(gulpif(isProd, csso()))
        .pipe(gulp.dest('./css/'));
});

gulp.task('js', function() {
    gulp.src(['src/js/**/*.js'])
        .pipe(angularFilesort())
        .on('error', notify.onError("Error: <%= error.message %>"))
        .pipe(ngAnnotate())
        .pipe(gulpif(isProd, uglify({
            compress: {
                drop_console: false
            }
        })))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('vendor', function() {
    gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/moment/min/moment-with-locales.js',
        'node_modules/angular/angular.js',
        'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
        'node_modules/angularjs-datepicker/dist/angular-datepicker.js',
    ])
        .pipe(concat('vendor.js'))
        .pipe(gulpif(isProd, uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        })))
        .pipe(gulp.dest('js'));
});

gulp.task('templates', function () {
    gulp.src("views/*.html")
    .pipe(gulpif(isProd, minifyHtml({
        empty: true,
        spare: true,
        quotes: true
    })))
    .pipe(ngHtml2Js({
        moduleName: "testTask",
        prefix: "views/"
    }))
    .pipe(gulpif(isProd, uglify({
        mangle: false,
        compress: {
            drop_console: true
        }   
    })))
    .pipe(concat("templates.js"))
    .pipe(gulp.dest("js"));
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/styl/**/*.styl', ['stylus']);
    gulp.watch('views/*.html', ['templates']);
});

gulp.task('build', ['stylus', 'vendor', 'js', 'templates']);
gulp.task('default', ['build', 'watch']);

gulp.task('serve', function() {
    gulp.src('')
        .pipe(webserver({
            host: 'localhost',
            port: 8000,
            livereload: true,
            directoryListing: false,
            open: false,
            fallback: 'index.html'
        }));
});

