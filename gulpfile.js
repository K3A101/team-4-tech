const {
    src,
    dest,
    watch
} = require('gulp');
const minifyCss = require('gulp-clean-css');
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');
/* gulp concat bundled de files */
const bundleCss = () => {
    /* alle css selecteren */
    return src('./public/css/**/*.css')
        /* zet het in een pijplijn (klaarzetten), om vervolgens te minifyen en in de dist folder te zetten */
        .pipe(minifyCss())
        .pipe(concat('bundle.css'))
        .pipe(dest('./public/dist/css'));
}

const automatisch = () => {
    watch('./public/css/**/*.css', bundleCss);
};

exports.bundleCss = bundleCss;
exports.automatisch = automatisch;

const bundleJs = () => {
    return src('./public/scripts/**/*.js')
        .pipe(minifyJs())
        .pipe(concat('bundle.js'))
        .pipe(dest('./public/dist/js'));
}

const automatischJs = () => {
    watch('./public/scripts/**/*.js', bundleJs);
};

exports.bundleJs = bundleJs;
exports.automatischJs = automatischJs;