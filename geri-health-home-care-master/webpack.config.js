// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path');

module.exports = {
	context: __dirname,
	devtool: 'source-map',
	entry: {
		index: ['picturefill', 'lazysizes', 'es6-promise', 'whatwg-fetch', './source/scripts/index.ts'],
	},
	output: {
		filename: '[name].gen.js',
		path: __dirname + '/build/scripts'
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader'
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			}
		]
	},
	plugins: [
		new CheckerPlugin()
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	}
}
