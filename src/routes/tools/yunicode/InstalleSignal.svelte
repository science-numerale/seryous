<script lang="ts">
	import { keys } from "$lib/utils";

	let {
		text,
	}: {
		text: string;
	} = $props();

	let products = {
		signal: {
			title: "Installe Signal !",
			src: "https://signal.org/",
		},
		tor: {
			title: "Dark Net bro",
			src: "https://fr.wikipedia.org/wiki/Le_Projet_Tor",
		},
		linux: {
			title: "I use NixOS btw",
			src: "https://fr.wikipedia.org/wiki/Linux",
		},
		tails: {
			title: "Edward Snowden brrrrr",
			src: "https://fr.wikipedia.org/wiki/Tails_(syst%C3%A8me_d%27exploitation)",
		},
		monero: {
			title: "Le liquide sur 𝗟'Internet",
			src: "https://fr.wikipedia.org/wiki/Monero",
		},
	} satisfies Record<string, { title: string; src: string }>;

	let active = $derived(
		keys(products).filter((s) => text.toLowerCase().includes(s)),
	);
</script>

{#if active.length > 0}
	<div
		style="display: flex; flex-direction: row; flex-wrap: wrap; flex-grow: 1;"
		class="full-div"
	>
		{#each active as product}
			<iframe {...products[product]} style="flex-grow: 1; min-height: 30rem;"
			></iframe>
		{/each}
	</div>
{/if}
