const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  // or 'production' based on your needs
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,  // Cleans the output directory before each build
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devtool: 'source-map',  // Generates source maps for debugging
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,  // Opens the browser automatically
    port: 8080,  // Port number for the development server
  },
};
