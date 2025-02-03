<script lang="ts">
	import type { Snippet } from "svelte";
	//import type { SvelteHTMLElements } from "svelte/elements";

	interface Props {
		children: Snippet;
		onClick?: () => void;
		variant?: "primary" | "secondary" | "span";
		disabled?: boolean;
	}

	let {
		children,
		onClick,
		variant = "primary",
		disabled = false,
		...props
	}: Props & { style?: string } = $props();

	let doIt = $state(disabled ? () => {} : onClick);
</script>

{#if variant === "span"}
	<span
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (e.key === "Enter") doIt?.();
		}}
		onclick={doIt}
		{...props}>{@render children?.()}</span
	>
{:else}
	<button {disabled} class={variant} onclick={doIt} {...props}
		>{@render children?.()}</button
	>
{/if}

<style>
	* {
		cursor: pointer;
	}
</style>
