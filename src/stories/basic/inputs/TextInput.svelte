<script lang="ts">
	let {
		value = $bindable(),
		placeholder = "",
		disabled = false,
		variant = "input",
	}: {
		value: string;
		placeholder?: string;
		disabled?: boolean;
		variant?: "input" | "textarea"
	} = $props();
</script>

{#if variant === "input"}
<input bind:value {placeholder} {disabled}>
{:else}
	<textarea bind:value {placeholder} {disabled}></textarea>
{/if}
