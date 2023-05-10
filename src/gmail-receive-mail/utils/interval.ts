import { LocalSetInterval } from '../types/interval';

let _intervalId: NodeJS.Timer | undefined;

export const localSetInterval = (param: LocalSetInterval) => {
	if (_intervalId) {
		return;
	}

	_intervalId = setInterval(param.callback, param.ms);
};

export const localClearInterval = (): void => {
	if (!_intervalId) {
		return;
	}

	clearInterval(_intervalId);
	_intervalId = undefined;
};

export const intervalId: Readonly<NodeJS.Timer> | undefined = structuredClone(_intervalId);
