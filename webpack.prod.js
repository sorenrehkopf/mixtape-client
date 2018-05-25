const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
	mode: 'production',
	plugins: [
		new UglifyJSPlugin({
			sourceMaps: true
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": "'production'"
		})
	]
});