const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/',
};

// const PAGES_DIR = `${PATHS.src}/pug/pages/`;

// const TEMPLATES = [];

// const PAGES = fs
// 	.readdirSync(PAGES_DIR)
// 	.filter((fileName) => fileName.endsWith('.pug'));

module.exports = {
	externals: {
		paths: PATHS,
	},
	entry: {
		app: PATHS.src,
	},
	output: {
		filename: `${PATHS.assets}js/[name].[contenthash].js`,
		path: PATHS.dist,
		publicPath: '/',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
	module: {
		rules: [
			{
				// JavaScript
				test: /\.js$/,
				use: ['babel-loader', 'eslint-loader'],
				exclude: '/node_modules/',
			},
			{
				// TypeScript
				test: /\.ts$/,
				use: ['babel-loader', 'eslint-loader'],
				exclude: '/node_modules/',
			},
			{
				// Pug
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true,
				},
			},
			{
				// CSS
				test: /\.css$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: './postcss.config.js' },
						},
					},
				],
			},
			{
				// SCSS
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { sourceMap: true },
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							config: { path: './postcss.config.js' },
						},
					},
					{
						loader: 'sass-loader',
						options: { sourceMap: true },
					},
				],
			},
			{
				// Fonts
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				// Images
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[contenthash].css`,
		}),
		new CopyWebpackPlugin([
			{ from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
			{ from: `${PATHS.src}/static`, to: '' },
		]),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/app/pages/home/index.pug`,
		}),
		new HtmlWebpackPlugin({
			filename: 'products.html',
			template: `${PATHS.src}/app/pages/products/products.pug`,
		}),
		new HtmlWebpackPlugin({
			filename: 'gallery.html',
			template: `${PATHS.src}/app/pages/gallery/gallery.pug`,
		}),
		new HtmlWebpackPlugin({
			filename: 'profile.html',
			template: `${PATHS.src}/app/pages/user/profile.pug`,
		}),

		// ...TEMPLATES.map(
		// 	(temp) => new HtmlWebpackPlugin({
		// 		template:
		// 		filename:
		// 	}),
		// ),
	],
};
