'use strict';
const BrowserWindow = require('browser-window');

module.exports = {
	ipc: function ipc(channel) {
		const window = BrowserWindow.getFocusedWindow();

		const args = [].slice.call(arguments, 1);
		args.unshift(channel);
		window.webContents.send.apply(window.webContents, args);
	}
};
