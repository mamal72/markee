'use strict';
const file = require('../actions/files');
const ipc = require('../utils/ipc');
const dialogs = require('../utils/dialogs');

module.exports = {
	openFile: filePath => {
		filePath = filePath || dialogs.openFile();

		if (!filePath) {
			return;
		}

		filePath = filePath[0];
		file.open(filePath).then(data => {
			ipc.ipc('file:load', data);
		}).catch(err => {
			dialogs.showError('Oops', err);
		});
	},
	saveFile: fileData => {
		if (!fileData) {
			ipc.ipc('file:info');
			return;
		}
		// ipc.ipc('file:info');
		const filePath = fileData.path || dialogs.saveFile();
		if (!filePath) {
			return;
		}
		file.save(`${filePath}`, fileData.content).then(data => {
			dialogs.showMessage({message: data.message});
		}).catch(err => {
			dialogs.showError('Oops', err);
		});
	},
	tooglePreview: () => {
		ipc.ipc('view:toggleEditor');
	},
	toggleSideBySide: () => {
		ipc.ipc('view:toggleSideBySide');
	},
	toggleRtl: () => {
		ipc.ipc('view:toggleRtl');
	}
};
