// function to edit todo
export function editTodo(event: Event) {
	// extract and type todo
	const inputEl = event.target as HTMLInputElement;
	// get index
	// works as set data-index={i} on input in HTML markup
	// note '+' casts it as a number and ! silences ts error
	const index = +inputEl.dataset.index!;

	// reassign todo text in array
	todos[index].text = inputEl.value;
}
