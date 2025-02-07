<script lang="ts">
	import type { Snippet } from "svelte";
	//import type { SvelteHTMLElements } from "svelte/elements";

	interface Props {
		onClick?: () => void;
		variant?: "primary" | "secondary" | "span";
		disabled?: boolean;
	}

	let {
		children,
		label,
		onClick,
		variant = "primary",
		disabled = false,
		...props
	}: Props & { style?: string } & (
			| { label?: undefined; children: Snippet }
			| { children?: undefined; label: string }
		) = $props();

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
		{...props}>{@render here()}</span
	>
{:else}
	<button {disabled} class={variant} onclick={doIt} {...props}
		>{@render here()}</button
	>
{/if}

{#snippet here()}
	{#if children}
		{@render children()}
	{:else}
		{label}
	{/if}
{/snippet}

<style>
	* {
		cursor: pointer;
	}
</style>
