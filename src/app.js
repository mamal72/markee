'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');
const Menu = require('menu');
const file = require('./menu/handlers');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadUrl(`file://${__dirname}/renderer/views/index.html`);
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});

ipc.on('file:info', (ev, args) => {
	if (!args.content) {
		return;
	}
	file.saveFile(args);
});

// Set main menu
const mainMenuTemplate = require('./menu');
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate.main);
Menu.setApplicationMenu(mainMenu);
