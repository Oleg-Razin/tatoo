var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglifyjs'),
    cleanCss= require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename  = require('gulp-rename'),
    htmlmin      = require('gulp-htmlmin'),
    del     = require('del');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'project'
        },
        notify: false
    });
});
gulp.task('sass' , function () {
    return gulp.src('project/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('project/css'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('script' , function () {
    return gulp.src([
        'project/js/libs/jquery/dist/jquery.min.js',
        'project/js/libs/bootstrap/bootstrap.min.js',
        'project/js/libs/isotope.pkgd/isotope.pkgd.min.js',
        'project/js/libs/jquery.magnific-popup/jquery.magnific-popup.min.js',
        'project/js/libs/packery-mode.pkgd/packery-mode.pkgd.min.js',
        'project/js/libs/jquery.formstyler/jquery.formstyler.min.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('project/js/libs'));
});
gulp.task('min-css' , function () {
    return gulp.src([
        'project/css/libs/bootstrap/bootstrap.min.css',
        'project/css/libs/popup-animation/popup-animation.css',
        'project/css/libs/magnific-popup/magnific-popup.css',
        'project/css/libs/jquery.formstyler/jquery.formstyler.theme.css',
        'project/css/libs/jquery.formstyler/jquery.formstyler.css'
    ])
        .pipe(cleanCss())
        .pipe(concat('libs.min.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('project/css'))
});
gulp.task('main-min', function () {
    return gulp.src('project/css/style.css')
        .pipe(cleanCss())
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('project/css'))

})
gulp.task('minify-html', function() {
    return gulp.src('project/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(done) {
    del.sync('dist');
    done();
});


gulp.task('build-dist', function(done) {
    var buildCss = gulp.src('project/css/*.min.css')
        .pipe(gulp.dest('dist/css'));

    var buildJs = gulp.src('project/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    var buildImages = gulp.src('project/images/**/*')
        .pipe(gulp.dest('dist/images'));

    done();
});
gulp.task('build', gulp.series('clean', 'sass', 'min-css' , 'main-min' , 'script', 'minify-html', 'build-dist'));

gulp.task('watch', function(){
    gulp.watch('project/css/**/*.scss', gulp.parallel['sass']);
    gulp.watch('project/js/libs/**/*.js', gulp.parallel('script'));
    gulp.watch('project/js/*.js').on("change", browserSync.reload);
    gulp.watch('project/*.html').on('change', browserSync.reload);
});
