<script lang="ts">
	import Button from "../components/basic/Button.svelte";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";

	let chosis = $state(false);
	let exiting = $state(false);
	function choisir(choix: "red" | "blue") {
		console.log(choix);
		if (choix === "red") chosis = true;
		else {
			exiting = true;
			setTimeout(() => goto(base + "/"), 6000);
		}
	}
</script>

<div
	style="display: flex; flex-direction: column; height: 100%; opacity: {exiting
		? '0%'
		: '100%'}; transition: all 5s;"
>
	<div>
		<h1>Nous somme vraiment désolés...</h1>
		<p>Cette page a un... vous savez quoi... un b... bu... gg</p>
		<p>Êtes-vous prêts à affronter cette créature ?</p>
	</div>

	{#if chosis}
		<h1 style="margin: auto;">{page.status}</h1>
	{:else}
		<div
			style="width: 100%; display: flex; flex-direction: column; align-items: center; flex-grow: 1;"
		>
			<img
				alt="Matrix : scène des pillules"
				style="max-width: 100%; width: 50rem;"
				src="https://upload.wikimedia.org/wikipedia/commons/8/83/Red_or_blue_pill.svg"
			/>
			<h1>Laquelle choisissez-vous ?</h1>
			<div class="choix" style="display: flex; flex-grow: 1; width: 100%;">
				{#each ["red", "blue"] as const as color}
					<Button
						variant="span"
						style="--color: {color};"
						onClick={() => choisir(color)}
						label="Pillule {color === 'blue' ? 'bleue' : 'rouge'}"
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.choix > :global(*) {
		display: inline-flex;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
		font-size: xx-large;
		transition: all 0.5s;
		min-height: 5rem;
		padding: 1rem;
		cursor: pointer;
	}
	@media (hover: hover) {
		.choix > :global(*:hover) {
			color: white;
			background: var(--color);
		}
	}

	@media (hover: none) {
		.choix > :global(*) {
			color: white;
			background: var(--color);
		}
	}
</style>
