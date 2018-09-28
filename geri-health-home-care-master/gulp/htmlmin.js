import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import plumber from 'gulp-plumber';

module.exports = (src, dest, opts) => {
	opts = Object.assign({
		collapseWhitespace: true
	}, opts);

	return gulp.src(src)
		.pipe(plumber())
		.pipe(htmlmin(opts))
		.pipe(gulp.dest(dest));
};
