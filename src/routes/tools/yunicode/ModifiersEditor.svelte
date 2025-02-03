<script lang="ts">
	import Button from "../../../components/basic/Button.svelte";

	let {
		modifiers = $bindable([]),
	}: {
		modifiers: string[];
	} = $props();
</script>

<div>
	<ul>
		{#each modifiers as _, i}
			<li>
				<input style="width: 5rem;" bind:value={modifiers[i]} />
				<Button
					onClick={() => {
						modifiers.splice(i, 1);
					}}>Supprimer</Button
				>
			</li>
		{/each}
	</ul>
	<Button
		onClick={() => {
			modifiers.push("");
		}}>Ajouter</Button
	>
</div>
