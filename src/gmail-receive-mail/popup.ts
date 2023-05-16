import { Message } from './models/message';

const startButtonClickEventListener = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
		if (!tabs[0].id) {
			return;
		}
		chrome.tabs.sendMessage(tabs[0].id, {
			action: 'start',
		} satisfies Message);
	});
};

const endButtonClickEventListener = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
		if (!tabs[0].id) {
			return;
		}
		chrome.tabs.sendMessage(tabs[0].id, {
			action: 'end',
		} satisfies Message);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	const startButton = document.getElementById('startButton');
	const endButton = document.getElementById('endButton');
	startButton?.addEventListener('click', startButtonClickEventListener);
	endButton?.addEventListener('click', endButtonClickEventListener);
});
