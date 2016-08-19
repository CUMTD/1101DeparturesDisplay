module.exports = {
    entry: [
        './ts/main.tsx'
    ],
    output: {
        path: 'build',
        publicPath: '/build',
        filename: '[name].js'
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'axios': 'axios'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: 'source-map'
};