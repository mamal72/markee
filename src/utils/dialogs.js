'use strict';
const dialog = require('dialog');

module.exports = {
	showError: options => {
		options = options || {};
		options.title = options.title || 'Oops';
		options.message = options.message || 'Error happened! :(';
		dialog.showErrorBox(options.title, options.message);
	},
	showMessage: options => {
		options = options || {};
		options.title = options.title || 'OK';
		options.message = options.message || 'Done!';
		options.type = options.type || 'none';
		options.buttons = options.buttons || ['OK'];
		dialog.showMessageBox(options);
	},

	openFile: options => {
		// default filter
		options = options || {};
		if (!options.filters) {
			options.filters = [{
				name: 'Markdown Files',
				extensions: ['md', 'markdown']
			}, {
				name: 'All Files',
				extensions: ['*']
			}];
		}
		// default props
		if (!options.properties) {
			options.properties = ['openFile'];
		}

		const path = dialog.showOpenDialog(options);
		return path;
	},

	saveFile: options => {
		// default filter
		options = options || {};
		if (!options.filters) {
			options.filters = [{
				name: 'Markdown Files',
				extensions: ['md', 'markdown']
			}];
		}

		const path = dialog.showSaveDialog(options);

		return path;
	}
};
