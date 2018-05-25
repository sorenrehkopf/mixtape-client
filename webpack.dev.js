const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const buildDir = path.resolve(__dirname, 'public');

module.exports = merge(common, {
	mode: 'development',
	watch: true,
	devServer: {
		contentBase: buildDir,
		historyApiFallback: {
			index: `index.html`
		},
		inline: true,
		port:4400,
		proxy: {
			"/api": "http://localhost:3000/api"
		}
	}
});