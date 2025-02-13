<script lang="ts">
	import type { InputProps } from "./input";

	let {
		value = $bindable(),
		options,
		variant = "select",
		disabled = false,
	}: {
		options: string[];
		variant?: "select" | "radio";
	} & InputProps<string> = $props();
</script>

{#if variant === "select"}
	<select {disabled} bind:value>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
{:else}
	{#each options as option}
		<label>
			<input type="radio" bind:group={value} value={option} /> {option}
		</label>
	{/each}
{/if}
