var

// Settings
browserSyncProxy     = 'localhost/Lab19/html19',
nodePath             = './node_modules',
dest                 = './dist',
autoprefixerBrowsers = ['last 2 versions', '> 1%', 'ie 9'],
webpackConfig        = require('./webpack.config.js'),

// Gulp Modules
gulp                 = require('gulp'),
plumber              = require('gulp-plumber'),
webpack              = require('webpack-stream'),
sass                 = require('gulp-sass'),
less                 = require('gulp-less'),
uglify               = require('gulp-uglify'),
postcss              = require('gulp-postcss'),
autoprefixer         = require('autoprefixer'),
cssnano              = require('cssnano'),
connect              = require('gulp-connect-php'),
notify               = require('gulp-notify'),
browserSync          = require('browser-sync').create(),
browserSyncReload    = browserSync.reload;



// Plumber
var plumberHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
  })
};

// PostCSS
var postcssPlugins = [
  autoprefixer({
    browsers: autoprefixerBrowsers,
    cascade: false
  }),
  cssnano()
];



// SASS
gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(plumber(plumberHandler))
    .pipe(sass({
      precision: 10,
      includePaths: [
        './node_modules'
      ]
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

// LESS
gulp.task('less', function () {
  return gulp.src('less/main.less')
    .pipe(plumber(plumberHandler))
    .pipe(less())
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
});

// JAVASCRIPT
gulp.task('js', function () {
  return gulp.src('js/main.js')
    .pipe(plumber(plumberHandler))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(dest));
});

// WATCH
gulp.task('js-watch', ['js'], function (done) {
  browserSync.reload();
  done();
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  // gulp.watch('less/**/*.less', ['less']);
  gulp.watch('js/**/*.js', ['js-watch']);
  gulp.watch('**/*.html').on('change', browserSyncReload);
  gulp.watch('**/*.php').on('change', browserSyncReload);
});

// COPY FONTS
gulp.task('copy-fa-fonts', function () {
  return gulp.src(nodePath + '/font-awesome/fonts/**/*')
    .pipe(gulp.dest('./fonts/'));
});

// BUILD
gulp.task('build', ['sass', 'js']);

// PHP
gulp.task('php', ['watch'], function () {
  connect.server({
    port: 1919,
    open: false,
    hostname: '127.0.0.1',
    base: './',
    stdio: 'ignore'
  }, function () {
    browserSync.init({
      ghostMode: false,
      ui: false,
      notify: false,
      proxy: '127.0.0.1:1919'
    });
  });
});

// BROWSER
gulp.task('browser', ['watch'], function () {
  browserSync.init({
    ghostMode: false,
    ui: false,
    notify: false,
    proxy: browserSyncProxy
  });
});

gulp.task('default', ['php']);
