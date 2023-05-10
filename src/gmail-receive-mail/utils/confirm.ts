import { LocalSetInterval } from '../types/interval';
import { localClearInterval, localSetInterval } from './interval';

export const localConfirm =
	(setIntervalArg: LocalSetInterval) =>
	(message: string): boolean => {
		localClearInterval();
		const agree = window.confirm(message);
		if (agree) {
			localSetInterval(setIntervalArg);
		}
		return agree;
	};
