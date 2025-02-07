<script lang="ts">
	import type { Snippet } from "svelte";

	let {
		children,
		summary,
	}: {
		children: Snippet;
		summary: string;
	} = $props();
</script>

<details>
	<summary>{summary}</summary>
	{@render children()}
</details>
