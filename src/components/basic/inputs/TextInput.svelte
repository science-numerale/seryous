<script lang="ts">
	import type { InputProps } from "./input";

	let {
		value = $bindable(),
		placeholder = "",
		disabled = false,
		variant = "input",
	}: {
		placeholder?: string;
		variant?: "input" | "textarea";
	} & InputProps<string> = $props();
</script>

{#if variant === "input"}
	<input bind:value {placeholder} {disabled} />
{:else}
	<textarea bind:value {placeholder} {disabled}></textarea>
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
