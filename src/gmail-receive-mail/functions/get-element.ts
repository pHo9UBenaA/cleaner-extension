import { ClassName } from '../constants/element';

export const getHandler = (): HTMLDivElement | null => {
	const inboxHandler = document.querySelector<HTMLDivElement>(`.${ClassName.handleWrapper}`);
	return inboxHandler;
};

export const getAllSelectCheckbox = (inboxHandler: HTMLDivElement): HTMLSpanElement | null => {
	// Todo: select-box
	const allSelectCheckbox = inboxHandler.querySelector<HTMLSpanElement>(
		`.${ClassName.handleAllSelectCheckbox}`
	);
	return allSelectCheckbox;
};

export const getMailToBeDeleted = (): HTMLTableRowElement[] | null => {
	const tableWrapper = document.querySelector<HTMLDivElement>(`.${ClassName.tableWrapper}`);
	if (!tableWrapper) {
		return null;
	}

	const tableRaws: NodeListOf<HTMLTableRowElement> = tableWrapper.querySelectorAll('tbody > tr');
	if (!tableRaws) {
		return null;
	}
	const tableRowArray = Array.from(tableRaws);

	const formattedTableRaws = tableRowArray.filter((row) => {
		const starMail = row.querySelector<HTMLSpanElement>(`.${ClassName.tableRowStarActive}`);
		if (!starMail) {
			return true;
		}

		// Memo: 削除対象には含まれないが、念の為スター付きのチェックを外す
		const target = row.querySelector<HTMLTableRowElement>(`.${ClassName.tableRowCheckbox}`);
		target?.click();
		return false;
	});

	return formattedTableRaws;
};

export const getDeleteButton = (row: HTMLTableRowElement): HTMLLIElement | null => {
	const deleteButton = row.querySelector<HTMLLIElement>(`.${ClassName.tableRowDeleteButton}`);
	return deleteButton;
};
