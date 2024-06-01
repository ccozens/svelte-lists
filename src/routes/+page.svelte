<script lang="ts">
	type Todo = {
		text: string;
		done: boolean;
	};
	type Filters = 'all' | 'active' | 'completed';

	let todos = $state<Todo[]>([]);
	let filter = $state<Filters>('all');
	let filteredTodos = $derived(filterTodos());

	function addTodo(event: KeyboardEvent) {
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

	function editTodo(event: Event) {
		// extract and type todo
		const inputEl = event.target as HTMLInputElement;
		// get index
		// works as set data-index={i} on input in HTML markup
		// note '+' casts it as a number and ! silences ts error
		const index = +inputEl.dataset.index!;

		// reassign todo text in array
		todos[index].text = inputEl.value;
	}

	function toggleTodo(event: Event) {
		const inputEl = event.target as HTMLInputElement;
		const index = +inputEl.dataset.index!;
		todos[index].done = !todos[index].done;
	}

	function setFilter(newFilter: Filters) {
		filter = newFilter;
	}

	function filterTodos() {
		switch (filter) {
			case 'all':
				return todos;
			case 'active':
				return todos.filter((todo) => !todo.done);
			case 'completed':
				return todos.filter((todo) => todo.done);
		}
	}
</script>

<input onkeydown={addTodo} placeholder="Add todo" type="text" />

<div class="todos">
	{#each filteredTodos as todo, i}
		<div class="todo">
			<input oninput={editTodo} data-index={i} value={todo.text} type="text" />
			<input onchange={toggleTodo} data-index={i} checked={todo.done} type="checkbox" />
		</div>
	{/each}
</div>

<div class="filters">
	{#each ['all', 'active', 'completed'] as filter}
		<button onclick={() => setFilter(filter)}>{filter}</button>
	{/each}
</div>

<style>
	.todos {
		display: grid;
		gap: 1rem;
		margin-block-start: 1rem;
	}

	.todo {
		position: relative;
		transition: opacity 0.3s;
	}

	.Completed {
		opacity: 0.4;
	}

	input[type='text'] {
		background: #263238;
		color: white;
		width: 100%;
		padding: 1rem;
	}

	input[type='checkbox'] {
		position: absolute;
		right: 4%;
		top: 50%;
		translate: 0% -50%;
	}

	.filters {
		margin-block: 1rem;
	}

	button {
		margin-inline-end: 1rem;
		background: #727475;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: All 0.3s;
	}
</style>
