var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    ngAnnotate = require('gulp-ng-annotate'),
    angularFilesort = require('gulp-angular-filesort'),
    notify = require('gulp-notify'),
    ngHtml2Js = require('gulp-ng-html2js'),
    minifyHtml = require('gulp-minify-html'),
    browserify = require('browserify'),
    through = require('through2'),
    intoStream = require('into-stream'),
    buffer = require('vinyl-buffer');


var isDev = true,
    isProd = false;

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
        .pipe(through.obj(function(file, encoding, next) {
            bundle = browserify(intoStream(file.contents));
            this.push(new gutil.File({
                path: 'app.js',
                contents: bundle.bundle()
            }));
            next()
        }))
        .pipe(buffer())
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

gulp.task('build', ['stylus', 'js', 'templates']);
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

