import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
export default {
  entry: { bundle: './src/index.js' },
  output: {
    filename: '[name][hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name][chunkhash:base64:5].js'
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: './build',
    disableHostCheck: true,
    historyApiFallback: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s?css/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name][hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer(), postcssPresetEnv(), cssnano()],
              config: {
                ctx: {
                  autoprefixer: { browsers: 'last 10 versions' },
                  cssnano: { preset: 'default' },
                  ['postcss-preset-env']: {}
                }
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
