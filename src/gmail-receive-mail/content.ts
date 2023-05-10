import { MESSAGE } from './constants/message';
import { INTERVAL_TIME } from './constants/interval';
import { intervalId, localClearInterval, localSetInterval } from './utils/interval';
import { localConfirm } from './utils/confirm';
import { deleteNonStarredMails } from './functions/delete-non-starred-mail';
import { LocalSetInterval } from './types/interval';

// Todo: 既読メールをスター付きに変更
// Todo: スター無しを探しに行く（パラメータが見当たらないため受信メール内で遷移し続ける必要があるかも）
{
	const setIntervalArg: LocalSetInterval = {
		callback: deleteNonStarredMails,
		ms: INTERVAL_TIME,
	};

	const confirm = localConfirm(setIntervalArg);

	window.document.onkeydown = function (event) {
		if (!event.shiftKey || event.key !== 'Enter') {
			return;
		}

		const agree = intervalId
			? confirm(MESSAGE.confirmSuspension)
			: confirm(MESSAGE.confirmExecute);
		if (!agree) {
			return;
		}

		if (intervalId) {
			localClearInterval();
			return;
		}
		localSetInterval(setIntervalArg);
	};
}
