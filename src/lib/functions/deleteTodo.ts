// function to delete todo
export function deleteTodo(event: Event) {
	const inputEl = event.target as HTMLInputElement;
	const index = +inputEl.dataset.index!;
	todos = todos.filter((todo, i) => i !== index);
}
