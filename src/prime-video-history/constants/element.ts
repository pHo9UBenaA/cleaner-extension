export const ElementName = {
	tabHeader: 'h3',
} as const satisfies { [key: string]: string };

export const ClassName = {
	navigation: 'settings-navigation-tabs',
	activeNavigationElement: 'dvui-tab-active',
} as const satisfies { [key: string]: string };

export const Text = {
	historyTabHeader: '視聴履歴',
	deleteTargetButton: '視聴履歴からエピソードを削除する',
} as const satisfies { [key: string]: string };

const historyTab =
	'https://www.amazon.co.jp/gp/video/settings/watch-history/ref=atv_set_watch-history';
export const Url = {
	historyTab,
} as const satisfies { [key: string]: string };
