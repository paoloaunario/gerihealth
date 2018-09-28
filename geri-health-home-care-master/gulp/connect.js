import connect from 'gulp-connect';
import open from 'open';

module.exports = (src, opts) => {
	opts = Object.assign({
		root: src,
		port: 8000,
		livereload: true
	}, opts);

	connect.server(opts);
	open(`http://localhost:${opts.port}`);
};
