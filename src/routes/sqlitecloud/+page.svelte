<script lang="ts">
	const { data } = $props();
	const serverTodos = data.todos;

	import type { Todo, Filters } from '$types';

	let todos = $state<Todo[]>(serverTodos);
	let filter = $state<Filters>('all');
	let filteredTodos = $derived(filterTodos());

	// function to toggle todo
	function toggleTodo(event: Event) {
		const inputEl = event.target as HTMLInputElement;
		const todoIndex = +inputEl.dataset.todoindex!;
		const taskIndex = +inputEl.dataset.taskindex!;
		const task = todos[todoIndex].tasks[taskIndex];
		task.done = !task.done;
	}

	// // function to uncheck all todos
	function clearCompleted() {
		todos = todos.map((todo) => ({
			...todo,
			tasks: todo.tasks.map((task) => ({ ...task, done: false }))
		}));
		// set filter to all
		setFilter('all');
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
				return todos.map((todo) => ({
					...todo,
					tasks: todo.tasks.filter((task) => !task.done)
				}));
			case 'completed':
				return todos.map((todo) => ({
					...todo,
					tasks: todo.tasks.filter((task) => task.done)
				}));
		}
	}

	let buttonStyle = 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-3 rounded-lg';
	let buttonActive =
		'transition duration-600 active:ring-2 active:ring-offset-2 active:ring-pink-700';
	let buttonFocus = 'transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-pink-700';
</script>

<div class="grid gap-4 m-4">
	{#each filteredTodos as todo, todoIndex}
		<div class="flex flex-col items-center bg-slate-900 border-2 border-slate-600">
			<h2 class="text-3xl text-center my-3">{todo.heading}</h2>
			{#each todo.tasks as task, taskIndex}
				<input
					id="task-{taskIndex}"
					type="checkbox"
					bind:checked={task.done}
					data-todoIndex={todoIndex}
					data-taskIndex={taskIndex}
					hidden
				/>
				<label for="task-{taskIndex}" class={task.done
					? 'bg-slate-700 p-2 w-11/12 mb-1 rounded-sm transition duration-300 opacity-10 '
					: 'bg-slate-700 opacity-90 w-11/12 p-2 mb-1 rounded-sm'}>
					{task.text}
				</label>
			{/each}
		</div>
	{/each}
</div>

<div class="m-4 flex justify-between">
	{#each ['all', 'active', 'completed'] as filter}
		<button
			class="{buttonStyle} {buttonFocus} capitalize"
			onclick={() => setFilter(filter as Filters)}
		>
			{filter}
		</button>
	{/each}
	<button class="{buttonStyle} {buttonActive}" onclick={clearCompleted}>Uncheck all</button>
</div>
