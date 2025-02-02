<script lang="ts">
    import type { Snippet } from "svelte";

	let {
		children,
		name,
	}: {
		children: Snippet,
		name: string
	} = $props()
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content="{name}" />
</svelte:head>

<h1>{name}</h1>
{@render children()}
