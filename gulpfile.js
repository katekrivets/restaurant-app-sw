const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
const browserSync = require('browser-sync').create();


gulp.task('default', ['copy-html', 'images', 'styles', 'scripts', 'copy-data'], () => {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('./sw.js', ['scripts']);
    gulp.watch('./index.html', ['copy-html']);
    gulp.watch('./dist/restoraunt.html'); //.on('change', browserSync.reload);
    gulp.watch('./dist/index.html');

    // browserSync.init({
    // 	server: './dist'
    // });
});

gulp.task('dist', [
    'copy-html',
    'images',
    'styles',
    'scrips',
    'copy-data'
]);
// using babel to be sure our code works in all browsers
gulp.task('scripts', () => {
    gulp.src('js/*.js').pipe(babel({
        presets: ['env']
    })).pipe(gulp.dest('dist/js'));
    gulp.src('./sw.js').pipe(babel({
        presets: ['env']
    })).pipe(gulp.dest('dist'));


});
//copying html-file
gulp.task('copy-html', () => {
    gulp.src('./*.html').pipe(gulp.dest('./dist'));
});
//copying and making responsive images by using png quantization for progressive load
gulp.task('images', () => {
    gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            use: [imageminPngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});
gulp.task('copy-data', () => {
    gulp.src('data/*')
        .pipe(gulp.dest('dist/data'))
});
// using sass styling
gulp.task('styles', () => {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'));
    // .pipe(browserSync.stream());
});