<script lang="ts">
	import type { Todo, Filters } from './types';
	import { groupedTodos } from './todos';

	let todos = $state<Todo[]>(groupedTodos);
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
					...todos,
					tasks: todo.tasks.filter((task) => !task.done)
				}));
			case 'completed':
				return todos.map((todo) => ({
					...todos,
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
		<div class="">
			<h2 class="text-3xl text-center my-3">{todo.heading}</h2>
			{#each todo.tasks as task, taskIndex}
				<button
					onclick={toggleTodo}
					data-todoIndex={todoIndex}
					data-taskIndex={taskIndex}
					class={task.done
						? 'bg-indigo-950 w-full p-2 m-2 rounded-sm transition duration-300 opacity-10 '
						: 'bg-indigo-950 w-full p-2 m-2 rounded-sm '}
					>{task.text}
				</button>
			{/each}
		</div>
	{/each}
</div>

<div class="m-4 flex justify-between">
	{#each ['all', 'active', 'completed'] as filter}
		<button class="{buttonStyle} {buttonFocus} capitalize" onclick={() => setFilter(filter)}>
			{filter}
		</button>
	{/each}
	<button class="{buttonStyle} {buttonActive}" onclick={clearCompleted}>Uncheck all</button>
</div>
