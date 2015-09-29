'use strict';
const handlers = require('./handlers');

const file = {
	label: 'File',
	submenu: [{
		label: 'Open',
		accelerator: 'CmdOrCtrl+O',
		click: () => {
			handlers.openFile();
		}
	}, {
		label: 'Save',
		accelerator: 'CmdOrCtrl+S',
		click: () => {
			handlers.saveFile();
		}
	}, {
		type: 'separator'
	}, {
		label: 'Quit',
		accelerator: 'CmdOrCtrl+Q',
		click: () => {
			require('app').quit();
		}
	}]
};

const edit = {
	label: 'Edit',
	submenu: [{
		label: 'Undo',
		accelerator: 'CmdOrCtrl+Z',
		role: 'undo'
	}, {
		label: 'Redo',
		accelerator: 'Shift+CmdOrCtrl+Z',
		role: 'redo'
	}, {
		type: 'separator'
	}, {
		label: 'Cut',
		accelerator: 'CmdOrCtrl+X',
		role: 'cut'
	}, {
		label: 'Copy',
		accelerator: 'CmdOrCtrl+C',
		role: 'copy'
	}, {
		label: 'Paste',
		accelerator: 'CmdOrCtrl+V',
		role: 'paste'
	}, {
		label: 'Select All',
		accelerator: 'CmdOrCtrl+A',
		role: 'selectall'
	}]
};

const view = {
	label: 'View',
	submenu: [{
		label: 'Toggle Preview',
		accelerator: 'CmdOrCtrl+E',
		click: () => {
			handlers.tooglePreview();
		}
	}, {
		label: 'Toggle Side By Side View',
		accelerator: 'CmdOrCtrl+D',
		click: () => {
			handlers.toggleSideBySide();
		}
	}, {
		label: 'Toggle RTL',
		accelerator: 'CmdOrCtrl+M',
		click: () => {
			handlers.toggleRtl();
		}
	}]
};

const help = {
	label: 'Help',
	submenu: [{
		label: 'Learn More',
		click: () => {
			require('shell').openExternal('http://github.com/mamal72/markee');
		}
	}]
};

const main = [file, edit, view, help];

module.exports = {
	main
};
