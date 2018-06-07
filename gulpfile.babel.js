// Dependencies
import path              from 'path';
import gulp              from 'gulp';
import connectPHP        from 'gulp-connect-php';
import plumber           from 'gulp-plumber';
import notify            from 'gulp-notify';
import sass              from 'gulp-sass';
import postcss           from 'gulp-postcss';
import autoprefixer      from 'autoprefixer';
import sourcemaps        from 'gulp-sourcemaps';
import watch             from 'gulp-watch';
import webpack           from 'webpack-stream';
import webpackConfigDEV  from './webpack.dev';
import webpackConfigPROD from './webpack.prod';
import { create as browserSyncCreate } from 'browser-sync';



// Settings
const browserSync = browserSyncCreate();
const browserSyncProxy = 'local-url.test';

const basePath = __dirname;
const nodePath = path.resolve(__dirname, 'node_modules');
const dest = `${basePath}/dist`;



// DEV TASKS -> sass / js / watch / php / proxy / build
// =======================================================================

// Plumber
var plumberHandler = {
  errorHandler: notify.onError({
    title: 'Gulp Error',
    message: '<%= error.message %>'
  })
};

// SASS
gulp.task('sass', () => {
  return gulp.src(`${basePath}/scss/**/*.scss`)
    .pipe(plumber(plumberHandler))
    .pipe(sourcemaps.init())
    .pipe(sass({
      precision: 10,
      includePaths: [nodePath]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

gulp.task('sass:prod', () => {
  return gulp.src(`${basePath}/scss/**/*.scss`)
    .pipe(plumber(plumberHandler))
    .pipe(sass({
      precision: 10,
      outputStyle: 'compressed',
      includePaths: [nodePath]
    }))
    .pipe(postcss([
      autoprefixer({ cascade: false })
    ]))
    .pipe(gulp.dest(dest));
});

// JS
gulp.task('js', () => {
  return gulp.src(`${basePath}/js/main.js`)
    .pipe(plumber(plumberHandler))
    .pipe(webpack(webpackConfigDEV))
    .pipe(gulp.dest(dest));
});

gulp.task('js:prod', () => {
  return gulp.src(`${basePath}/js/main.js`)
    .pipe(plumber(plumberHandler))
    .pipe(webpack(webpackConfigPROD))
    .pipe(gulp.dest(dest));
});

gulp.task('js-watch', ['js'], (done) => {
  browserSync.reload();
  done();
});

// Watch
gulp.task('watch', () => {
  watch(`${basePath}/scss/**/*.scss`, () => gulp.start('sass'));
  watch(`${basePath}/js/**/*.js`, () => gulp.start('js-watch'));
  watch(`${basePath}/**/*.html`, () => browserSync.reload());
  watch(`${basePath}/**/*.php`, () => browserSync.reload());
});

// PHP
gulp.task('php', ['watch'], () => {
  connectPHP.server({
    port: 8000,
    open: false,
    hostname: '127.0.0.1',
    base: __dirname,
    stdio: 'ignore'
  }, () => {
    browserSync.init({
      ghostMode: false,
      ui: false,
      notify: false,
      proxy: '127.0.0.1:8000'
    });
  });
});

// Proxy
gulp.task('proxy', ['watch'], () => {
  browserSync.init({
    ghostMode: false,
    ui: false,
    notify: false,
    proxy: browserSyncProxy
  });
});

// Build
gulp.task('build', ['sass:prod', 'js:prod']);

// Default
gulp.task('default', ['php']);
