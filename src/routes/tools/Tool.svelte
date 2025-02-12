<script lang="ts" generics="T extends ToolStorage">
	import { _storage, type ToolStorage } from "$lib/storage.svelte";
	import type { Snippet } from "svelte";
	import Button from "../../components/basic/Button.svelte";

	let {
		children,
		storage = $bindable(),
		name,
		small = false,
	}: {
		children: Snippet;
		storage: T;
		name: string;
		small?: boolean;
	} = $props();

	const trueDef = storage;

	storage = Object.assign(
		{},
		$state.snapshot(trueDef),
		$state.snapshot(_storage[name] || {}),
	);

	$effect(() => {
		_storage[name] = storage;
	});
	$effect(() => {
		storage = _storage[name];
	});
</script>

<div style="display: inline-block; width: 100%;">
	<div class="box">
		{@render children()}
	</div>

	{#if !small}
		<div>
			<Button
				disabled={JSON.stringify(storage) === JSON.stringify(trueDef)}
				label="Réinitialiser"
				onClick={() => {
					storage = trueDef;
				}}
			/>
		</div>
	{/if}
</div>
