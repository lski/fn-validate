const path = require('path');
const webpack = require('webpack');
const webpackAutoInject = require('webpack-auto-inject-version');

module.exports = (env) => {

    const prod = env && env.prod;
    const filename = prod ? 'fn-validate.min.js' : 'fn-validate.js';
    const plugins = [new webpackAutoInject({ autoIncrease: false, injectByTag: false })];

    if (prod) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

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