import type { LayoutServerLoad } from './$types';
import type { Heading, Todo, TaskWithID } from '$types';
import { database } from '$hooks';

export const load: LayoutServerLoad = async () => {
	// get data
	const headings: Heading[] = await database.sql`SELECT * FROM headings`;
	const tasks: TaskWithID[] = await database.sql`SELECT todo_id, id, text, done FROM tasks`;

	// join headings and tasks
	const todos: Todo[] = headings.map((heading) => {
		return {
			heading: heading.heading,
			tasks: tasks
				.filter((task) => task.todo_id === heading.id)
				.map((task) => ({
					id: task.id,
					text: task.text,
					done: task.done
				}))
		};
	});

	return {
		todos
	};
};
