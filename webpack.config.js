const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports ={
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "app.js"
    },
    plugins: [
        new HTMLPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true, config: { path: 'postcss.config.js' } }
                        },
                        'sass-loader',

                    ],
            },
        ],
    },
    devServer: {
        port: 3000
    }
}