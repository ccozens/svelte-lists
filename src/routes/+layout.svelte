<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	let { children } = $props<{ children: Snippet }>();
</script>

{@render children()}

<style>
	:global(html, body) {
		height: 100%;
	}

	:global(body) {
		display: grid;
		place-content: center;
		background-color: hsl(220 10% 8%);
	}
</style>
