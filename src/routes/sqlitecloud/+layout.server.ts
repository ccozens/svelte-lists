import type { LayoutServerLoad } from './$types';
import type { Heading, Todo, TaskWithID } from '$types';

import { Database } from '@sqlitecloud/drivers';
import { SQLITECLOUD_CONNECTION_STRING } from '$env/static/private';

export const load: LayoutServerLoad = async () => {
	const database = new Database(SQLITECLOUD_CONNECTION_STRING);

	// set database to use
	const setDatabase = async () => {
		await database.sql`USE DATABASE svelte_lists.sqlite`;
	};

	await setDatabase();

	// get data
	const headings: Heading[] = await database.sql`SELECT * FROM headings`;
	const tasks: TaskWithID[] = await database.sql`SELECT todo_id, text, done FROM tasks`;
	// console.log('headings', headings);
	console.log('tasks', tasks);

	// join headings and tasks
	const todos: Todo[] = headings.map((heading) => {
		return {
			heading: heading.heading,
			tasks: tasks
				.filter((task) => task.todo_id === heading.id)
				.map((task) => ({
					text: task.text,
					done: task.done
				}))
		};
	});

	return {
		todos
	};
};
