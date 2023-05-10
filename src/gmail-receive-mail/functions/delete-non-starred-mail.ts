import { env } from '../env';
import { MESSAGE } from '../constants/message';
import { INTERVAL_TIME } from '../constants/interval';
import { LocalSetInterval } from '../types/interval';
import {
	getAllSelectCheckbox,
	getDeleteButton,
	getHandler,
	getMailToBeDeleted,
} from './get-element.js';
import { localClearInterval } from '../utils/interval';
import { localConfirm } from '../utils/confirm';
import { AriaCheckedStatus } from '../constants/element';

export const deleteNonStarredMails = (): void => {
	const inboxHandler = getHandler();
	if (!inboxHandler) {
		localClearInterval();
		return;
	}

	const allSelectCheckbox = getAllSelectCheckbox(inboxHandler);
	if (!allSelectCheckbox) {
		localClearInterval();
		return;
	}
	// Memo: 動作見た感じ意味ないかもしれないけど一応
	if (allSelectCheckbox.ariaChecked !== AriaCheckedStatus.false) {
		allSelectCheckbox.click();
	}
	allSelectCheckbox.click();

	// Memo: 一括削除ボタンのクリックイベントが発火しなかった
	// removeStarMailSelection();
	// deleteMail(inboxHandler);

	// Memo: とりあえず一個ずつ消している
	const mailToBeDeleted = getMailToBeDeleted();
	if (!mailToBeDeleted || !mailToBeDeleted.length) {
		localClearInterval();
		return;
	}

	deleteMail(mailToBeDeleted);
};

const setIntervalArg: LocalSetInterval = {
	callback: deleteNonStarredMails,
	ms: INTERVAL_TIME,
};

const confirm = localConfirm(setIntervalArg);

const deleteMail = (tableRows: HTMLTableRowElement[]): void => {
	if (!deleteMail.length) {
		return;
	}

	const agree = env.CONFIRM_WHEN_DELETE === 'yes' ? confirm(MESSAGE.deleteConfirm) : true;
	if (!agree) {
		alert(MESSAGE.deleteRejected);
		localClearInterval();
		return;
	}

	tableRows.forEach((row) => {
		const deleteButton = getDeleteButton(row);
		if (deleteButton) {
			deleteButton.click();
		}
	});
};

// const removeStarMailSelection = (): void => {
// 	const tableWrapper = document.querySelector<HTMLDivElement>(
// 		`.${className.handleAllDeleteButton}`
// 	);
// 	if (!tableWrapper) {
// 		return;
// 	}

// 	const tableRaws: NodeListOf<HTMLTableRowElement> =
// 		tableWrapper.querySelectorAll('tbody > tr');
// 	if (!tableRaws) {
// 		return;
// 	}

// 	const regExp = new RegExp(tableStarRowAreaLabel);
// 	tableRaws.forEach((row) => {
// 		if (row.children[2].innerHTML.match(regExp)) {
// 			const target = row.children[1] as HTMLDivElement;
// 			target.click();
// 		}
// 	});
// };

// const deleteMail = (inboxHandler: HTMLDivElement): void => {
// 	const allRemoveButton = inboxHandler.querySelector<HTMLDivElement>(
// 		`.${HANDLE_DELETE_ELEMENTS_CLASS_NAME}`
// 	);
// 	if (!allRemoveButton) {
//         return;
//     }

//     allRemoveButton.click();
// };
