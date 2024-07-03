import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { database } from '$hooks';

export const actions = {
	toggle: async ({ request }) => {
		const data = await request.formData();
		const todoToUpdate = data.get('id');
		const todoStatus = data.get('status');

		// Validate input
		if (!todoToUpdate || !todoStatus) {
			return { error: 'Missing required data (id or status)' };
		}

		// replace boolean value with 1 or 0
		const todoStatusValue = todoStatus === 'true' ? 1 : 0;

		// update database with try/catch for error handling
		try {
			await database.sql`UPDATE tasks SET done = ${todoStatusValue} WHERE id = ${todoToUpdate}`;
			// No explicit return needed here, as successful update falls through
		} catch {
			return fail(422, {
				error: 'Failed to update todo'
			});
		}
	},

	uncheckAll: async () => {
		try {
			await database.sql`UPDATE tasks SET done = 0`;
		} catch {
			return fail(422, {
				error: 'Failed to reset todos'
			});
		}

		// No explicit return needed here, as successful update falls through
	}
} satisfies Actions;
