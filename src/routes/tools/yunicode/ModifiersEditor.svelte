<script lang="ts">
	import Button from "../../../components/basic/Button.svelte";

	let {
		modifiers = $bindable([]),
	}: {
		modifiers: string[];
	} = $props();
</script>

<div>
	<strong>Modificateurs :</strong>
	{#if modifiers.length === 0}
		<br />
		<small>(Essayez de regarder dans la bibliothèque)</small>
	{/if}
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
