var gulp = require('gulp');
var sass = require('gulp-sass');

var config = {
    publicDir: './public',
};

gulp.task('css', function() {
    return gulp.src(config.publicDir + '/css/compile.scss')
    .pipe(sass({
        includePaths: [config.publicDir],
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});

gulp.task('fonts', function() {
    return gulp.src(config.publicDir + '/fonts/**/*')
    .pipe(gulp.dest(config.publicDir + '/fonts'));
});

gulp.task('default', ['css', 'fonts']);
