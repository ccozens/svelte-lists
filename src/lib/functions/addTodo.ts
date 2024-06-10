// function to add todo
export function addTodo(todos, event: KeyboardEvent) {
	// check if enter key was pressed
	if (event.key !== 'Enter') return;

	// type todo
	const todoElement = event.target as HTMLInputElement;
	const text = todoElement.value;
	// add to todos array
	todos = [...todos, { text, done: false }];

	// blank input after adding to array
	todoElement.value = '';
}
