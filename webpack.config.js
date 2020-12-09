const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './public'),
    assets: 'assets/'
}
const PAGES_DIR = PATHS.src
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith('.html'))

module.exports ={
    devtool: 'inline-source-map',
    entry:  `./src/js/app.js`,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: `${PATHS.assets}js/[name].js`,
        publicPath: ''

    },
    resolve: {
        alias: {
            images: path.resolve(__dirname,'./src/img/')
        }
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: `${PATHS.src}/img`, to: `${PATHS.assets}img/`},
                {from: `${PATHS.src}/static`, to: '' }
            ]
        }),
        ...PAGES.map(
            page =>
                new HTMLPlugin({
                    template: `${PAGES_DIR}/${page}`,
                    filename: `./${page}`,
                    inject: true
                })
        ),
        new CleanWebpackPlugin(),


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
            {
                test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `${PATHS.assets}img/[name].[ext]`,
                    }
                }],

            }
        ],
    },
    devServer: {
        port: 3000
    }
}