<script lang="ts">
	import { assignDefault, keys } from "$lib/utils";
	import Button from "../../../components/basic/Button.svelte";
	import TextInput from "../../../components/basic/inputs/TextInput.svelte";
	import getVariant, {
		alphabetsDB,
		getDefaultParams,
		modifiersDB,
		type WritingParams,
	} from "./unicodeStuff";

	let {
		writingParams = $bindable(),
	}: {
		writingParams: WritingParams;
	} = $props();

	let search = $state("");
</script>

<TextInput bind:value={search} placeholder="Recherchez ici..." />

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
	{@render dbView(
		"Alphabets",
		alphabetsDB,
		(bAlphabet, bVariant) => {
			writingParams.alphabet.font =
				bAlphabet as typeof writingParams.alphabet.font;
			writingParams.alphabet.variant =
				bVariant as typeof writingParams.alphabet.variant;
		},
		(font, variant) => ({
			title: getVariant(
				`${font} (${variant})`,
				assignDefault(getDefaultParams(), {
					alphabet: { font: font as "normal", variant: variant as "normal" },
				}),
			),
			enabled:
				writingParams.alphabet.font === font &&
				writingParams.alphabet.variant === variant,
			disabled:
				writingParams.alphabet.font === font &&
				writingParams.alphabet.variant === variant,
		}),
	)}

	{@render dbView(
		"Modificateurs (cumulables)",
		modifiersDB,
		(modifier, variant) => {
			const modif = (modifiersDB as Record<string, Record<string, string>>)[
				modifier
			][variant];
			if (!writingParams.modifiers.includes(modif)) {
				writingParams.modifiers.push(modif);
			} else {
				writingParams.modifiers = writingParams.modifiers.filter(
					(s) => s !== modif,
				);
			}
		},
		(modifier, variant) => {
			const modif = (modifiersDB as Record<string, Record<string, string>>)[
				modifier
			][variant];
			return {
				title: getVariant(
					`${modifier} (${variant})`,
					assignDefault(getDefaultParams(), {
						modifiers: [modif],
					}),
				),
				enabled: writingParams.modifiers.includes(modif),
				disabled: false,
			};
		},
	)}
</div>

{#snippet dbView(
	title: string,
	db: Record<string, Record<string, any>>,
	onSelect: (id1: string, id2: string) => void,
	showAs: (
		id1: string,
		id2: string,
	) => { title: string; enabled: boolean; disabled: boolean },
)}
	<div>
		<h3>{title}</h3>
		{#each keys(db) as id1}
			<ul>
				{#each keys(db[id1]) as id2}
					{@const sAs = showAs(id1, id2)}
					{#if id2.toLowerCase().includes(search.toLowerCase()) || id1
							.toLowerCase()
							.includes(search.toLowerCase()) || search === ""}
						<li>
							<Button
								variant="span"
								disabled={sAs.disabled}
								onClick={() => {
									onSelect(id1, id2);
								}}
								>{sAs.title}
								{#if sAs.enabled}
									<strong style="color: green;">(actif)</strong>{/if}
							</Button>
						</li>
					{/if}
				{/each}
			</ul>
		{/each}
	</div>
{/snippet}
