import { deleteHistory } from './functions/delete-history';
import { ClassName, ElementName, Text, Url } from './constants/element';

{
	let intervalId: number | undefined;

	const refreshInterval = (): void => {
		clearInterval(intervalId);
		intervalId = undefined;
	};

	const scrollToBottom = (): void => {
		window.scrollTo(0, document.body.scrollHeight);
	};

	const scheduleDeleteTask = () => {
		// Memo: 一括削除すると不審なクライアントとして強制ログアウトさせられるよう
		intervalId = setInterval(deleteHistory, 1000);
	};

	const observeNavigation = (): void => {
		const observeMutation: MutationCallback = (
			mutations: MutationRecord[],
			observer: MutationObserver
		) => {
			mutations.forEach((mutations) => {
				const { href, className } = mutations.target as HTMLAnchorElement;
				const isHistory = href === Url.historyTab;
				const isActive = className.includes(ClassName.activeNavigationElement);
				if (isHistory && isActive) {
					scrollToBottom();
					scheduleDeleteTask();
					return;
				}
				refreshInterval();
			});
		};

		const navigationTabs = document.getElementById(ClassName.navigation) as HTMLDivElement;
		const config: MutationObserverInit = {
			attributes: true,
			subtree: true,
		};
		const observer = new MutationObserver(observeMutation);
		observer.observe(navigationTabs, config);
	};

	const initialize = (): void => {
		const level3headers = Array.from(document.querySelectorAll(ElementName.tabHeader));
		const isHistory: boolean = level3headers.some(
			(h3: HTMLHeadingElement) => h3.textContent === Text.historyTabHeader
		);
		if (isHistory) {
			scrollToBottom();
			scheduleDeleteTask();
		}
	};

	window.document.onkeydown = function (event) {
		if (!event.shiftKey || event.key !== 'Enter') {
			return;
		}

		const agree = intervalId
			? window.confirm('Do you want to stop the deletion process?')
			: window.confirm('Do you want to start the deletion process?');
		if (!agree) {
			return;
		}

		if (intervalId) {
			refreshInterval();
			return;
		}

		initialize();
		observeNavigation();
	};
}
