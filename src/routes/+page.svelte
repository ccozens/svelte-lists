<script lang="ts">
	let todos = $state([
		{ text: 'Todo 1', done: false },
		{ text: 'Todo 2', done: true },
		{ text: 'Todo 3', done: false }
	]);

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
        const index = +inputEl.dataset.index!

        // reassign todo text in array
        todos[index].text = inputEl.value;
    }
</script>

<input onkeydown={addTodo} placeholder="Add todo" type="text"  />

<div class="todos">
	{#each todos as todo, i}
		<div class="todo">
			<input oninput={editTodo} data-index={i} value={todo.text} type="text" />
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
</style>
