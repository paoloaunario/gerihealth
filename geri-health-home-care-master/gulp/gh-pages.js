import gulp from 'gulp';
import ghpages from 'gulp-gh-pages';
import plumber from 'gulp-plumber';

module.exports = (src, opts) => {
	opts = Object.assign({
		branch: 'gh-pages'
	}, opts);

	return gulp.src(src)
		.pipe(plumber())
		.pipe(ghpages(opts));
};
