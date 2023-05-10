import { Text } from '../constants/element';

export const deleteHistory = () => {
	/** 履歴の削除ボタンを取得 */
	const getFirstDeleteButton = (): HTMLButtonElement | null => {
		const buttonArray = Array.from(document.querySelectorAll('button'));

		if (!buttonArray.length) {
			return null;
		}

		if (Text.deleteTargetButton) {
			const targetButton = buttonArray.find(
				(buttonArray) => buttonArray.textContent === Text.deleteTargetButton
			);
			if (!targetButton) {
				return null;
			}
			return targetButton;
		}

		return buttonArray[0];
	};

	/** 削除処理 */
	const deleteHistory = () => {
		const deleteTarget = getFirstDeleteButton();
		if (deleteTarget) {
			deleteTarget.click();
		}
	};

	return deleteHistory;
};
