var gulp         = require('gulp');
var livereload   = require('gulp-livereload')
var uglify       = require('gulp-uglifyjs');
var sass         = require('gulp-sass');
var bourbon      = require('bourbon').includePaths;
var neat         = require('bourbon-neat').includePaths;
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var imagemin     = require('gulp-imagemin');




gulp.task('imagemin', function () {
    return gulp.src('web/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('web/images'));
});


gulp.task('sass', function () {
  gulp.src('web/sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('web/stylesheets'));
});


gulp.task('uglify', function() {
  gulp.src('web/lib/*.js')
    .pipe(uglify('app.js'))
    .pipe(gulp.dest('web/js'))
});

gulp.task('watch', function(){
    livereload.listen();

    gulp.watch('web/sass/**/*.scss', ['sass']);
    gulp.watch('web/lib/*.js', ['uglify']);
    gulp.watch(['web/stylesheets/app.css', 'web/*.php', 'web/js/*.js', 'web/parts/**/*.php'], function (files){
        livereload.changed(files)
    });
});