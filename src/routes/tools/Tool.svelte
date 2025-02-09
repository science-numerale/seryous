<script lang="ts" generics="T extends ToolStorage">
	import { _storage, type ToolStorage } from "$lib/storage.svelte";
	import type { Snippet } from "svelte";

	let {
		children,
		storage = $bindable(),
		name,
	}: {
		children: Snippet;
		storage: T;
		name: string;
	} = $props();

	storage = Object.assign(
		{},
		$state.snapshot(storage),
		$state.snapshot(_storage[name] || {}),
	);
	$effect(() => {
		_storage[name] = storage;
	});
</script>

<div
	style="display: inline-block; width: 100%;"
	class="box"
>
	{@render children()}
</div>
