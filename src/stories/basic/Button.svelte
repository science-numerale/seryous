<script lang="ts">
	import type { Snippet } from "svelte";

	// TODO : Enlever style
	let {
		children,
		onClick,
		variant = "primary",
		disabled = false,
	}: {
		children: Snippet;
		onClick?: () => void;
		variant?: "primary" | "secondary" | "span";
		disabled?: boolean;
	} = $props();

	let doIt = $state(disabled ? () => {} : onClick);
</script>

{#if variant === "span"}
	<span role="button" tabindex="0" onkeydown={() => {}} onclick={doIt}
		>{@render children?.()}</span
	>
{:else}
	<button {disabled} class={variant} onclick={doIt}
		>{@render children?.()}</button
	>
{/if}

<style>
	* {
		cursor: pointer;
	}
	[disabled] {
		cursor: not-allowed;
	}
</style>
