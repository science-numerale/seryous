<script lang="ts">
    import type { ComponentProps } from "svelte";
	import Button from "./basic/Button.svelte";

	let {
		text,
		...props
	}: {
		text: string;
	} & Omit<ComponentProps<typeof Button>, "onClick" | "children"> = $props()

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

	{...props}
	
	>{#if copied > 0}
		Copié !
	{:else}
		Copier
	{/if}</Button
>
