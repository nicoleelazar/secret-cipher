// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const {
    src,
    dest,
    watch,
    series
    // parallel
} = require('gulp');
// Importing all the Gulp-related packages
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();


// File paths
const files = {
    scssPath: 'app/scss/**/*.scss'
    // jsPath: 'app/js/**/*.js'
}

// Sass task: compiles the style.scss file into style.css
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')) // put final CSS in dist folder
        .pipe(browserSync.stream());
}

// JS task: concatenates and uglifies JS files to script.js
// function jsTask() {
//     return src([
//             files.jsPath
//             //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
//         ])
//         .pipe(concat('main.js'))
//         .pipe(uglify())
//         .pipe(dest('dist'))
//         .pipe(browserSync.stream());
// }


// Watch task: watch SCSS and JS files for changes and sync browser
function watchTask() {

    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    watch(files.scssPath, scssTask);
}

// Export the default Gulp task so it can be run
exports.default = series(
    scssTask,
    watchTask
);