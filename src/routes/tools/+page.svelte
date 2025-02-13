<script lang="ts">
	import { keys } from "$lib/utils";
	import SingleChoice from "../../components/basic/inputs/SingleChoice.svelte";
	import Yunicode from "./yunicode/Yunicode.svelte";
	import { toolsLinks } from "./tools";
	import EnvoYeur from "./envoyeur/EnvoYeur.svelte";

	let tool: keyof typeof toolsLinks = $state("Yunicode");
</script>

<SingleChoice options={keys(toolsLinks)} bind:value={tool} />

<div style="overflow: hidden; resize: both; width: min(100%, 50rem);">
	{#if tool === "Yunicode"}
		<Yunicode />
	{:else if tool === "envoYeur"}
		<EnvoYeur />
	{/if}
</div>
