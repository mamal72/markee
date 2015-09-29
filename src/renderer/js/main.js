'use strict';
const ipc = require('ipc');
const marked = require('marked');
const rendererData = {};
const viewer = document.querySelector('#viewer');
const editor = document.querySelector('#editor');

(function () {
	function getViewState() {
		return {
			view: viewer.classList.contains('hide') ? 'edit' : 'view',
			sideBySide: viewer.classList.contains('half')
		};
	}

	function toggleViewState() {
		const sideBySide = getViewState().sideBySide;
		if (sideBySide) {
			toggleSideBySide();
		}
		editor.classList.toggle('hide');
		viewer.classList.toggle('hide');
	}

	function toggleSideBySide() {
		const sideBySide = getViewState().sideBySide;
		if (sideBySide) {
			viewer.classList.remove('right');
			viewer.classList.remove('half');
			editor.classList.remove('half');
			editor.classList.add('hide');
		} else {
			viewer.classList.remove('hide');
			editor.classList.remove('hide');
			viewer.classList.add('half');
			editor.classList.add('half');

			viewer.classList.add('right');
		}
	}

	function loadData(data) {
		if (!rendererData.file) {
			rendererData.file = {};
		}
		rendererData.file = data;
		editor.value = rendererData.file.content;

		viewer.classList.remove('hide');
		editor.classList.add('hide');

		syncData();
	}

	function syncData() {
		if (!rendererData.file) {
			rendererData.file = {};
		}
		rendererData.file.content = editor.value;
		viewer.innerHTML = marked(rendererData.file.content);
	}

	ipc.on('file:load', data => {
		loadData(data);
	});

	ipc.on('view:toggleEditor', () => {
		toggleViewState();
	});

	ipc.on('view:toggleSideBySide', () => {
		toggleSideBySide();
	});

	ipc.on('file:info', () => {
		ipc.send('file:info', rendererData.file || {});
	});

	ipc.on('view:toggleRtl', () => {
		editor.classList.toggle('rtl');
		viewer.classList.toggle('rtl');
	});

	editor.addEventListener('change', syncData);
	editor.addEventListener('keyup', syncData);

	viewer.classList.add('hide');
})();
