const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports ={
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "index.[chankhach].js"
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 3000
    }
}