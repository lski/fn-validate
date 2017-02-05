const path = require('path');
const webpack = require('webpack');
const isProd = true; //process.env.NODE_ENV === 'production';

let plugins = !isProd ? [] : [
    new webpack.optimize.UglifyJsPlugin()
];
let filename = isProd ? 'fn-validate.min.js' : 'fn-validate.js';

module.exports = {
    context: path.resolve(__dirname, './'),
    entry: {
        app: './index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: filename,
        library: 'fnValidate',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['es2015', { modules: false }]
                    ]
                }
            }
        ]
    },
    plugins: plugins
};