export const MESSAGE = {
	start: 'Cleaner is now operational.',
	end: 'Cleaner operation terminated.',
	deleteConfirm: 'May I delete the email?',
	deleteRejected: 'Extensions have been deactivated.',
} as const satisfies { [key: string]: string };
