const del = require('delete');
const { src, dest, series, watch, parallel, task } = require('gulp');
const rollup = require("gulp-better-rollup");
const babel = require("@rollup/plugin-babel").babel;
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const uglify = require("rollup-plugin-uglify");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const rev = require('gulp-rev');
sass.compiler = require('node-sass');

const output_dir = 'lib'

function clean(cb) {
  del([output_dir + '/*'], cb);
}

function t_sass2css() {
  return src(['src/**/*.css', 'src/**/*.scss', '!src/js/**'])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(rev())
    .pipe(dest(output_dir + '/'))
}


function t_babel_cjs() {
  return src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(rollup({
      plugins: [
        babel({
          exclude: ['node_modules/**']
        }),
        nodeResolve(),
        uglify.uglify()

      ]
    }, {
      input: 'src/index.js',
      format: "cjs"
    }))
    .pipe(dest("lib"))
}


async function t_watch() {
  await watch(['src/**/*.js','src/**/*.scss','src/**/*.css'], { ignoreInitial: false }, series(clean, t_babel_cjs, t_sass2css))
}


exports.default = series(t_watch)