var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
	entry: path.resolve(__dirname, 'src/main.js'),
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist'),
		publicPath: './dist/'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: path.join(__dirname, 'src'),
			loaders: ['react-hot', 'babel']
		},
							{
								test: /\.scss$/,
								loader: "style!css!sass"
							},
							{ test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file" },
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
							}
						 ]
	}
};

module.exports = config;