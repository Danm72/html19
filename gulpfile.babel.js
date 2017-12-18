// Dependencies
import path              from 'path';
import gulp              from 'gulp';
import connectPHP        from 'gulp-connect-php';
import plumber           from 'gulp-plumber';
import notify            from 'gulp-notify';
import sass              from 'gulp-sass';
import autoprefixer      from 'gulp-autoprefixer';
import sourcemaps        from 'gulp-sourcemaps';
import webpack           from 'webpack-stream';
import webpackConfigDEV  from './webpack.dev';
import webpackConfigPROD from './webpack.prod';
import { create as browserSyncCreate } from 'browser-sync';



// Settings
const browserSync = browserSyncCreate();
const browserSyncReload = browserSync.reload;
const browserSyncProxy = 'local-url.dev';

const autoprefixerBrowsers = ['last 2 versions', '> 1%', 'ie 10'];

const basePath = __dirname;
const nodePath = `${basePath}/node_modules`;
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
    .pipe(autoprefixer({
      browsers: autoprefixerBrowsers,
      cascade: false
    }))
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
  gulp.watch(`${basePath}/scss/**/*.scss`, ['sass']);
  gulp.watch(`${basePath}/js/**/*.js`, ['js-watch']);
  gulp.watch(`${basePath}/**/*.html`).on('change', browserSyncReload);
  gulp.watch(`${basePath}/**/*.php`).on('change', browserSyncReload);
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
