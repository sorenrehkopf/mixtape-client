const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const buildDir = path.resolve(__dirname, 'public');
const appDir = path.resolve(__dirname, 'src');

const config = {
	entry: appDir+'/index.jsx',
	output: {
		path:buildDir,
		filename:'bundle.js'
	},
	module:{
		rules:[
			{
				test:/\.jsx?/,
				include:appDir,
				use:[{
                    loader: 'babel-loader'
                }]
			},
			{
	      test: /\.css$/,
	      exclude: /node_modules/,
	      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
        	use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
	      }),
		  },
		  {
	      test: /\.scss$/,
	      exclude: /node_modules/,
	      use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
	      }),
		  }
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
		alias: {
			"_": path.join(__dirname, 'src'),
			"purecss": path.join(__dirname, 'node_modules/purecss/build/pure.css')
		}
	},
	plugins: [
		new ExtractTextPlugin("style.css")
	],
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
};

module.exports = config;
