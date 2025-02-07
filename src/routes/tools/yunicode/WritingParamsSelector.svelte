<script lang="ts">
	import { assignDefault, keys } from "$lib/utils";
	import Button from "../../../components/basic/Button.svelte";
	import Details from "../../../components/basic/Details.svelte";
	import getVariant, {
		alphabetsDB,
		getDefaultParams,
		type Variant,
		type WritingParams,
	} from "./unicodeStuff";

	let {
		params = $bindable(),
	}: {
		params: WritingParams;
	} = $props();

	let oldVariant: typeof params.alphabet.variant;
	$effect(() => {
		if (params.alphabet.variant === "srevnela" && oldVariant !== "srevnela") {
			params.verlan = true;
		} else if (params.alphabet.variant !== "srevnela" && oldVariant === "srevnela") {
			params.verlan = false;
		}
		oldVariant = params.alphabet.variant;
	});
</script>

<div>
	<select
		bind:value={params.alphabet.font}
		oninput={() => {
			if (
				!(params.alphabet.variant in keys(alphabetsDB[params.alphabet.font]))
			) {
				params.alphabet.variant = keys(
					alphabetsDB[params.alphabet.font],
				)[0] as Variant<typeof params.alphabet.font>;
			}
		}}
	>
		{#each keys(alphabetsDB) as key}
			<option value={key}
				>{getVariant(
					key,
					assignDefault(getDefaultParams(), { alphabet: { font: key } }),
				)}</option
			>
		{/each}
	</select>
	<select bind:value={params.alphabet.variant}>
		{#each keys(alphabetsDB[params.alphabet.font]) as key}
			<option value={key}
				>{getVariant(
					key,
					assignDefault(getDefaultParams(), { alphabet: { font: params.alphabet.font, variant: key } }),
				)}</option
			>
		{/each}
	</select>
</div>

<br />

<Details summary="Modificateurs ({params.modifiers.length})">
	<fieldset>
		{#if params.modifiers.length === 0}
			<br />
			<small>(Essayez de regarder dans la bibliothèque)</small>
		{/if}
		<ul>
			{#each params.modifiers as _, i}
				<li>
					<input style="width: 5rem;" bind:value={params.modifiers[i]} />
					<Button
						onClick={() => {
							params.modifiers.splice(i, 1);
						}}>Supprimer</Button
					>
				</li>
			{/each}
		</ul>

		<Button
			onClick={() => {
				params.modifiers.push("");
			}}
			label="Ajouter"
		/>
	</fieldset>
</Details>
