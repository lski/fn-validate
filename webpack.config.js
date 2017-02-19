const path = require('path');
const webpack = require('webpack');

module.exports = (env) => {

    const prod = env && env.prod;
    const plugins = !prod ? [] : [
        new webpack.optimize.UglifyJsPlugin()
    ];
    const filename = prod ? 'fn-validate.min.js' : 'fn-validate.js';

    return {
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
    }
};