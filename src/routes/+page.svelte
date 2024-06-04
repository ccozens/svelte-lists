<script lang="ts">
	type Todo = {
		text: string;
		done: boolean;
	};
	type Filters = 'all' | 'active' | 'completed';

	let todos = $state<Todo[]>([]);
	let filter = $state<Filters>('all');
	let filteredTodos = $derived(filterTodos());

	// get todos from local storage
	$effect(() => {
		// check for todos already stored
		const savedTodos = localStorage.getItem('todos');
		console.log('local storage', savedTodos);
		// if there are saved todos, set them to the todos array
		if (savedTodos) {
			todos = JSON.parse(savedTodos);
		}
	});

	// save todos to local storage
	$effect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	});

	// function to add todo
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

	// function to edit todo
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

	// function to toggle todo
	function toggleTodo(event: Event) {
		const inputEl = event.target as HTMLInputElement;
		const index = +inputEl.dataset.index!;
		todos[index].done = !todos[index].done;
	}

	// function to uncomplete all todos
	function clearCompleted() {
		todos = todos.map((todo) => ({ ...todo, done: false }));
	}

	// function to delete todo
	function deleteTodo(event: Event) {
		const inputEl = event.target as HTMLInputElement;
		const index = +inputEl.dataset.index!;
		todos = todos.filter((todo, i) => i !== index);
	}

	// function to set filter
	function setFilter(newFilter: Filters) {
		filter = newFilter;
	}

	// function to filter todos
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

	// return count of todos still todo
	function remaining() {
		return todos.filter((todo) => !todo.done).length;
	}
</script>

<input onkeydown={addTodo} placeholder="Add todo" type="text" />

<div class="grid gap-4">
	{#each filteredTodos as todo, i}
		<div class={todo.done ? 'transition duration-300 opacity-50 relative' : 'relative'}>
			<input oninput={editTodo} data-index={i} value={todo.text} type="text" />
			<input onchange={toggleTodo} data-index={i} checked={todo.done} type="checkbox" />
			<button onclick={deleteTodo} data-index={i}>Delete</button>
		</div>
	{/each}
</div>

<div class="m-4">
	{#each ['all', 'active', 'completed'] as filter}
		<button onclick={() => setFilter(filter)}>{filter}</button>
	{/each}
	<button onclick={clearCompleted}>Clear completed</button>
</div>

<p>{remaining()} items left</p>

<style>


	input[type='text'] {
		background: #263238;
		width: 100%;
		padding: 1rem;
	}

	input[type='checkbox'] {
		position: absolute;
		right: 4%;
		top: 50%;
		translate: 0% -50%;
	}

	button {
		margin-inline-end: 1rem;
		background: #727475;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		cursor: pointer;
		transition: All 0.3s;
	}
</style>
