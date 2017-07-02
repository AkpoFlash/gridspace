const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('prod/styles/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('styles', ['sass'], function(){
	return gulp.src([
		'!dist/css/**/*.min.css',
		'dist/css/**/*.css'
	])
		.pipe(cssnano())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
	return gulp.src('prod/scripts/**/*.js')
		.pipe(babel({
      presets: ['es2015']
    }))
		.pipe(gulp.dest('dist/js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['styles', 'scripts'], function(){
	gulp.watch('prod/styles/**/*.scss', ['styles']);
	gulp.watch('prod/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);
