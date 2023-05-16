import { LocalSetInterval } from '../types/interval';
import { localInterval } from './interval';

// TODO
class LocalConfirm {
	private _confirmation: boolean = false;

	constructor() {}

	get confirmation(): boolean {
		return this._confirmation;
	}

	public confirm =
		(setIntervalArg: LocalSetInterval) =>
		(message: string): boolean => {
			localInterval.localClearInterval();
			this._confirmation = true;
			const agree = window.confirm(message);
			this._confirmation = false;
			if (agree) {
				localInterval.localSetInterval(setIntervalArg);
			}
			return agree;
		};
}

export const localConfirm = new LocalConfirm();
