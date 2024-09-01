const path = require('path');

module.exports = {

    mode: 'development',

    entry: './src/index.ts',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

        ],

    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // Updated option
        },
        compress: true,
        port: 9000,
    },
};