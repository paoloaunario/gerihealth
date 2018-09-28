import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sasslint from 'gulp-sass-lint';

module.exports = (src, opts = {}, failOnError = true) => {
	opts = Object.assign({
		configFile: 'sasslint.yml'
	}, opts);

	return gulp.src(src)
		.pipe(plumber())
		.pipe(sasslint(opts))
		.pipe(sasslint.format())
		.pipe(sasslint.failOnError());
};
