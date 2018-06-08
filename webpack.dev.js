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
		https: {
			key: fs.readFileSync('/home/sorenrehkopf/certs/mixtape-client/mixtape-client.key'),
			cert: fs.readFileSync('/home/sorenrehkopf/certs/mixtape-client/mixtape-client.crt')
		},
		inline: true,
		port: 443,
		proxy: {
			"/api": "http://localhost:3000/api"
		}
	}
});
