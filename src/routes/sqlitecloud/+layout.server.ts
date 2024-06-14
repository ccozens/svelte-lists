import type { LayoutServerLoad } from './$types';

import { Database } from '@sqlitecloud/drivers';
import { SQLITECLOUD_CONNECTION_STRING } from '$env/static/private';

export const load: LayoutServerLoad = async () => {

	const database = new Database(SQLITECLOUD_CONNECTION_STRING);


	// set database to use
	const setDatabase = async () => {
		await database.sql`USE DATABASE svelte_lists.sqlite`;
	};

	await setDatabase();

	const headings = await database.sql`SELECT * FROM todos`;
	const tasks = await database.sql`SELECT * FROM tasks`;
	console.log('headings', headings);
	console.log('tasks', tasks);

	return {

	};
};
