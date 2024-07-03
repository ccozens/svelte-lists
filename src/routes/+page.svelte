<script lang="ts">
	// imports
	import type { Todo, Filters } from '$types';
	import { enhance } from '$app/forms';
	import { afterNavigate } from '$app/navigation';

	// props
	const { data, form } = $props();

	// server state
	const serverTodos = data.todos;

	// state management
	let todos = $state<Todo[]>(serverTodos);
	let filter = $state<Filters>('all');
	let filteredTodos = $derived(filterTodos());

	// function to toggle todo local state
	function toggleTodo(event: Event) {
		const inputEl = event.target as HTMLInputElement;
		const todoIndex = +inputEl.dataset.todoindex!;
		const taskIndex = +inputEl.dataset.taskindex!;
		const task = todos[todoIndex].tasks[taskIndex];
		task.done = !task.done;
	}

	// function to uncheck all todos
	function uncheckAll() {
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

	// styles
	let buttonStyle = 'bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 p-3 rounded-lg';
	let buttonActive = 'transition duration-600 active:ring-2 active:ring-offset-2 active:ring-pink-700';
	let buttonFocus = 'transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-pink-700';

	// function to reset state update if form returns an error
	afterNavigate(() => {
		if (form?.error) {
			todos = serverTodos;
		}
	})

</script>

<div class="grid gap-4 m-4">
	{#each filteredTodos as todo, todoIndex}
		<div class="flex flex-col items-center bg-slate-900 border-2 border-slate-600">
			<h2 class="text-3xl text-center my-3">{todo.heading}</h2>
			{#each todo.tasks as task, taskIndex}
				<form method="POST" action="?/toggle" onclick={toggleTodo} class="w-11/12 rounded-sm" use:enhance>
					<input name="id" bind:value={task.id} type="hidden" />
					<input name="status" bind:value={task.done} type="hidden" />
					<button
						data-todoIndex={todoIndex}
						data-taskIndex={taskIndex}
						class={task.done
							? ' w-full p-2 mb-1 transition duration-300 opacity-10 '
							: 'bg-slate-700 opacity-90 w-full p-2 mb-1 '}
						>{task.text}
					</button>
				</form>
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
	<form method="POST" action="?/uncheckAll">
		<button class="{buttonStyle} {buttonActive}">Uncheck all</button>
	</form>
</div>
