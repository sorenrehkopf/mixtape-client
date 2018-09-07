const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');

const buildDir = path.resolve(__dirname, 'public');

module.exports = merge(common, {
	mode: 'development',
	watch: true,
	devServer: {
		contentBase: buildDir,
		disableHostCheck: true,
		historyApiFallback: {
			index: `index.html`
		},
		inline: true,
		port: 3030,
		proxy: {
			"/api": "http://localhost:3000/api",
		}
	}
});
