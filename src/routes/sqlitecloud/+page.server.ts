import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const todoToUpdate = data.get('id');
		const todoStatus = data.get('status');
		console.log('todoToUpdate', todoToUpdate);
		console.log('todoStatus', todoStatus);
	}
} satisfies Actions;
