import assemble from 'assemble';
import config from './config';
import connect from 'gulp-connect';
import extname from 'gulp-extname';
import markdown from 'helper-markdown';
import moment from 'moment';
import plumber from 'gulp-plumber';

module.exports = (src, dest, srcOpts = {}, assembleOpts = {}) => {
	assembleOpts = Object.assign({
		data: `${config.dirs.src}/data/${config.files.data}`,
		layouts: `${config.dirs.src}/templates/layouts/${config.files.templates}`,
		partials: `${config.dirs.src}/templates/partials/${config.files.templates}`
	}, assembleOpts);

	const app = assemble();

	// Pages
	const collection = 'pages';
	app.create(collection);
	app.pages(src, srcOpts);

	// Data
	app.data(assembleOpts.data);

	// Handlebars helpers
	app.helper('is', (a, b, options) => (a === b) ? options.fn(this) : options.inverse(this));
	app.helper('link-to', (a, b, c) => {
		let path = b.replace(a, '');

		if (!c) {
			c = '../';
		}

		path = `${c}${path}`;
		path = path.replace('.md', '.html');
		path = path.replace('.hbs', '.html');
		path = path.replace(/\/+/, '/');

		return path;
	});
	app.helper('markdown', markdown);
	app.helper('slugify', (a) => {
		return a.replace(/[^\w\s]/g, '').replace(/\s/, '-').toLowerCase();
	});
	app.helper('stringify', (a, options) => JSON.stringify(a));

	app.helper('currentDate', (options) => moment().format('MMMM Do YYYY, h:mm a'));

	// Layouts
	app.layouts(assembleOpts.layouts);
	app.option({ layout: 'default' });

	// Partials
	app.partials(assembleOpts.partials);

	return app.toStream(collection)
		.pipe(plumber())
		.pipe(app.renderFile())
		.pipe(extname())
		.pipe(app.dest(dest));
};
