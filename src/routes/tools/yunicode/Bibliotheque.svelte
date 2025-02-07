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
		(font, variant) =>
			getVariant(
				`${font} (${variant})`,
				assignDefault(getDefaultParams(), {
					alphabet: { font: font as "normal", variant: variant as "normal" },
				}),
			),
	)}

	{@render dbView(
		"Modificateurs (cumulable)",
		modifiersDB,
		(modifier, variant) => {
			writingParams.modifiers.push(
				(modifiersDB as Record<string, Record<string, string>>)[modifier][
					variant
				],
			);
		},
		(modifier, variant) =>
			getVariant(
				`${modifier} (${variant})`,
				assignDefault(getDefaultParams(), {
					modifiers: [
						(modifiersDB as Record<string, Record<string, string>>)[modifier][
							variant
						],
					],
				}),
			),
	)}
</div>

{#snippet dbView(
	title: string,
	db: Record<string, Record<string, any>>,
	onSelect: (id1: string, id2: string) => void,
	showAs: (id1: string, id2: string) => string,
)}
	<div>
		<h3>{title}</h3>
		{#each keys(db) as id1}
			<ul>
				{#each keys(db[id1]) as id2}
					{#if id2.includes(search) || id1.includes(search) || search === ""}
						<li>
							<Button
								variant="span"
								onClick={() => {
									onSelect(id1, id2);
								}}>{showAs(id1, id2)}</Button
							>
						</li>
					{/if}
				{/each}
			</ul>
		{/each}
	</div>
{/snippet}
