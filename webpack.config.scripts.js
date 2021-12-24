const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * CleanWebpackPlugin （ビルド先のほかのファイルを勝手に削除するやつ） はオフに。
 */
defaultConfig.plugins.shift();

// assets.phpを出力しない
for (let i = 0; i < defaultConfig.plugins.length; i++) {
	const pluginInstance = defaultConfig.plugins[i];
	if ('DependencyExtractionWebpackPlugin' === pluginInstance.constructor.name) {
		defaultConfig.plugins.splice(i, i);
	}
}

module.exports = {
	mode: 'production',
	entry: {
		search: path.resolve(__dirname, 'src/js/search.js'),
		setting: path.resolve(__dirname, 'src/js/setting.js'),
		validation: path.resolve(__dirname, 'src/js/validation.js'),
		update: path.resolve(__dirname, 'src/js/update.js'),
		colorpicker: path.resolve(__dirname, 'src/js/colorpicker.js'),
		datepicker: path.resolve(__dirname, 'src/js/datepicker.js'),
		// 'media': path.resolve( __dirname, 'src/js/media.js' ),
	},

	output: {
		path: path.resolve(__dirname, 'dist/js'),
		filename: '[name].js',
	},
	resolve: {
		alias: {
			'@blocks': path.resolve(__dirname, 'src/blocks/'),
		},
	},
	performance: { hints: false },
	devtool: 'none',
};
