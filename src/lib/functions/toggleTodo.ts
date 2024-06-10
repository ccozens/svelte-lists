// function to toggle todo
export function toggleTodo(event: Event) {
	const inputEl = event.target as HTMLInputElement;
	const index = +inputEl.dataset.index!;
	todos[index].done = !todos[index].done;
}
