<script lang="ts">
	import DeleteIcon from '$lib/icons/delete.svelte';

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

	let buttonStyle = 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-3 rounded-lg';
	let buttonActive = 'transition duration-600 active:ring-2 active:ring-offset-2 active:ring-pink-700';
	let buttonFocus = 'transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-pink-700';
</script>

<input onkeydown={addTodo} placeholder="Add todo" type="text" class="input-text m-4" />

<div class="grid gap-4 m-4">
	{#each filteredTodos as todo, i}
		<div class={todo.done ? 'transition duration-300 opacity-50 relative' : 'relative'}>
			<div class="flex">
				<input class="input-text" oninput={editTodo} data-index={i} value={todo.text} type="text" />
				<div class="flex flex-col items-center justify-evenly">
					<input
						class=""
						onchange={toggleTodo}
						data-index={i}
						checked={todo.done}
						type="checkbox"
					/>
					<button onclick={deleteTodo} data-index={i}><DeleteIcon /></button>
				</div>
			</div>
		</div>
	{/each}
</div>

<div class="m-4 flex justify-between">
	{#each ['all', 'active', 'completed'] as filter}
		<button class="{buttonStyle} {buttonFocus} capitalize" onclick={() => setFilter(filter)}>
				{filter}
		</button>
	{/each}
	<button class="{buttonStyle} {buttonActive}" onclick={clearCompleted}>Clear completed</button>
</div>

<p>{remaining()} items left</p>
