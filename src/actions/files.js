'use strict';
const fs = require('fs');

module.exports = {
	open: path => {
		return new Promise((resolve, reject) => {
			fs.readFile(path, 'utf-8', (err, content) => {
				if (err) {
					reject(err.message);
					return;
				}
				resolve({path, content});
			});
		});
	},
	save: (path, content) => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, content, err => {
				if (err) {
					reject(err.message);
					return;
				}
				resolve({message: 'File saved successfully.'});
			});
		});
	}
};
