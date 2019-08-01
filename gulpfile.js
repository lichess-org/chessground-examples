const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const colors = require('ansi-colors');
const logger = require('fancy-log');
const watchify = require('watchify');
const browserify = require('browserify');
const terser = require('gulp-terser');
const tsify = require('tsify');

const destination = () => gulp.dest('./dist');

const browserifyOpts = (debug) => ({
  entries: ['src/main.ts'],
  standalone: 'ChessgroundExamples',
  debug: debug
});

const prod = () => browserify(browserifyOpts(false))
  .plugin(tsify)
  .bundle()
  .pipe(source('chessground-examples.min.js'))
  .pipe(buffer())
  .pipe(terser({safari10: true}))
  .pipe(destination());

const dev = () => browserify(browserifyOpts(true))
  .plugin(tsify)
  .bundle()
  .pipe(source('chessground-examples.js'))
  .pipe(destination());

const watch = () => {

  const bundle = () => bundler
    .bundle()
    .on('error', error => logger.error(colors.red(error.message)))
    .pipe(source('chessground-examples.js'))
    .pipe(destination());

  const bundler = watchify(
    browserify(Object.assign({}, watchify.args, browserifyOpts(true)))
    .plugin(tsify)
  ).on('update', bundle).on('log', logger.info);

  return bundle();
};

gulp.task('prod', prod);
gulp.task('dev', dev);
gulp.task('default', watch);
