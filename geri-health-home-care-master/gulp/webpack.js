import * as config from './config';
import gulp from 'gulp';
import gulpif from 'gulp-if';
import webpack from 'webpack-stream';

module.exports = function (src, webpackConfig = {}) {
	// Get the webpack configuration contents.
	const fileConfig = require(src);

	// Merge the webpack configuration with passed in configuration.
	const mergedConfig = Object.assign(fileConfig, webpackConfig);

	const dest = mergedConfig.output.path;

	// Source needs to be set to a file, but it is not used.
	// All entry files are defined in the webpack configuration.
	return gulp.src('./source/scripts/index.ts')
		.pipe(webpack(mergedConfig))
		.pipe(gulp.dest(dest));
};
