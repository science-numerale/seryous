<script lang="ts">
	import Button from "./basic/Button.svelte";

	let {
		text
	}: {
		text: string
	} = $props()

	let copied = $state(0);
</script>

<Button
	onClick={() => {
		navigator.clipboard.writeText(text);
		copied += 1;
		setTimeout(() => {
			copied -= 1;
		}, 3000);
	}}
	>{#if copied > 0}
		Copié !
	{:else}
		Copier
	{/if}</Button
>
