<script>
	let todos = $state([
		{ text: 'Todo 1', done: false },
		{ text: 'Todo 2', done: true },
		{ text: 'Todo 3', done: false }
	]);
</script>

<div class="todos">
	{#each todos as todo, i}
		<div class="todo">
			<input value={todo.text} type="text" />
			<input value={todo.done} type="checkbox" />
		</div>
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

	.completed {
		opacity: 0.4;
	}

	input[type='text'] {
        background-color: dimgrey;
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
</style>
