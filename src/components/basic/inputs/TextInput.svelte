<script lang="ts">
	import type { InputProps } from "./input";

	let {
		value = $bindable(),
		placeholder = "",
		disabled = false,
		variant = "input",
		onValidate,
	}: {
		placeholder?: string;
		variant?: "input" | "textarea";
		onValidate?: () => void;
	} & InputProps<string> = $props();

	function keyDown(e: KeyboardEvent) {
		if (e.key === "Enter") onValidate?.();
	}
</script>

{#if variant === "input"}
	<input bind:value onkeydown={keyDown} {placeholder} {disabled} />
{:else}
	<textarea bind:value onkeydown={keyDown} {placeholder} {disabled}></textarea>
{/if}

<style>
	input,
	textarea {
		background: black;
		color: white;

		&::placeholder {
			color: white;
		}
	}
</style>
