import type { Actions } from './$types';
import { database } from '../hooks.server';

export const actions = {
	toggle: async ({ request }) => {
		const data = await request.formData();
		const todoToUpdate = data.get('id');
		const todoStatus = data.get('status');

		// update todo
		await database.sql`UPDATE tasks SET done = ${todoStatus} WHERE id = ${todoToUpdate}`;
		// re-render page
		return {};
	}
} satisfies Actions;
