import { INTERVAL_TIME } from './constants/interval';
import { localInterval } from './utils/interval';
import { deleteNonStarredMails } from './functions/delete-non-starred-mail';
import { LocalSetInterval } from './types/interval';
import { Message } from './models/message';
import { localConfirm } from './utils/confirm';
import { MESSAGE } from './constants/message';

// Todo: 既読メールをスター付きに変更
// Todo: スター無しを探しに行く（クエリパラメータが見当たらないため受信メール内で遷移し続ける必要があるかも）
{
	let isStarted: boolean = false;

	const setIntervalArg: LocalSetInterval = {
		callback: deleteNonStarredMails,
		ms: INTERVAL_TIME,
	};

	chrome.runtime.onMessage.addListener(
		(
			message: Message,
			sender: chrome.runtime.MessageSender,
			sendResponse: (response?: any) => void
		) => {
			if (!localConfirm.confirmation && !localInterval.intervalId) {
				isStarted = false;
			}

			if (message.action === 'start' && !isStarted) {
				isStarted = true;
				alert(MESSAGE.start);
				localInterval.localSetInterval(setIntervalArg);
				return;
			}

			if (message.action === 'end' && isStarted) {
				isStarted = false;
				alert(MESSAGE.end);
				localInterval.localClearInterval();
				return;
			}
		}
	);
}
