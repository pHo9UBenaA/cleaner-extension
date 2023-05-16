import { LocalSetInterval } from '../types/interval';

// TODO
class LocalInterval {
	private _intervalId: number | undefined;

	constructor() {}

	get intervalId(): Readonly<number> | undefined {
		return this._intervalId;
	}

	public localSetInterval = (param: LocalSetInterval) => {
		if (this._intervalId) {
			return;
		}

		this._intervalId = setInterval(param.callback, param.ms);
	};

	public localClearInterval = (): void => {
		if (!this._intervalId) {
			return;
		}

		clearInterval(this._intervalId);
		this._intervalId = undefined;
	};
}

export const localInterval = new LocalInterval();
