<script lang="ts">
	import { rndId } from "$lib/compUtils";
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

	let rnd = rndId();
</script>

{#if variant === "select"}
	<select {disabled}>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
{:else}
	{#each options as option}
		<input
			type="radio"
			bind:group={value}
			value={option}
			id={rnd(option)}
		/><label for={rnd(option)}>{option}</label>
	{/each}
{/if}
