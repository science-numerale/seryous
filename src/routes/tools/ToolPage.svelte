<script lang="ts">
	import { _storage, type ToolStorage } from "$lib/storage.svelte";
	import type { Snippet } from "svelte";

	let {
		tool,
		page,
		name,
	}: {
		tool: Snippet<[any]>;
		page: Snippet<[any]>;
		name: string;
	} = $props();

	_storage[name] = Object.assign(_storage[name], {font: "normal"});
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content={name} />
</svelte:head>

<div
	style="display: inline-block; position: sticky; top: 0; background: white; max-width: 100%; box-sizing: border-box;"
>
	{@render tool(_storage[name])}
</div>
{@render page(_storage[name])}
