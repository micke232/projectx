var path = require('path');
var webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	entry: [
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/dev-server',
		'./src/main'

	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		resolve: {
			fallback: [
				// This works both in Windows and Linux. I think it should be done internally by Webpack:
				path.join(__dirname, '/../../dir1/dir2/dir3')
			]
		},
		loaders: [{
			test: /\.jsx?$/,
			include: path.join(__dirname, 'src'),
			loaders: ['react-hot', 'babel']
		},
							{
								test: /\.scss$/,
								loader: "style!css!sass?sourceMap"
							},
							{ 
								test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, 
								loader: "file" },
							{
								test: /\.css$/,
								loader: 'style-loader!css-loader'
							},
							{
								test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
								loader: "file"
							},
							{
								test: /\.jpg/,
								loader: "url-loader?limit=10000&mimetype=image/jpg"
							},
							{ 
								test: /\.js$/, 
								exclude: /node_modules/, 
								loader: "babel", 
								query:
								{
									presets:['react']
								}
							}
						 ]
	}
};

