const path = require('path');

module.exports = {
    entry: {
        main: path.join(__dirname, '/ts/main.tsx')
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    devtool: '#source-map',
	resolve: {
		extensions: [
			'.webpack.js',
			'.web.js',
			'.ts',
			'.tsx',
			'.js'
		]
	}
};