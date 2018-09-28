const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	context: __dirname,
	devtool: 'source-map',
	entry: {
		index: './source/scripts/index.ts'
	},
	output: {
		filename: '[name].gen.js',
		path: __dirname + '/.tmp/scripts'
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
		// new UglifyJSPlugin({
		// 	sourceMap: true
		// })
	],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	}
}
