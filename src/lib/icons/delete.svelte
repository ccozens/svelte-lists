<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		onclick: (event: Event) => void;
		dataIndex: number;
	};

	let { children, onclick, dataIndex }: Props = $props();

</script>

<button {onclick}>
	{@render children()}
	{@html '&#128465;'}
</button>
