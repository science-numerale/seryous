<script lang="ts">
	import type { ToolStorage } from "$lib/storage.svelte";
	import Button from "../../../components/basic/Button.svelte";
	import TextInput from "../../../components/basic/inputs/TextInput.svelte";
	import ToolPage from "../ToolPage.svelte";
	import getVariant, {
		alphabetsDB,
		modifiersDB,
		type Font,
		type Variant,
	} from "./unicodeVariants";
	import Yunicode from "./Yunicode.svelte";

	function keys<T extends Record<string, any>>(
		obj: T,
	): (T extends T ? keyof T : never)[] {
		return Object.keys(obj) as (T extends T ? keyof T : never)[];
	}

	let cAlphabet: {
		font: Font;
		variant: Variant<Font>;
	} = $state({
		font: "normal",
		variant: "normal",
	});
	let cModifiers: string[] = $state([]);
	let search: string = $state("");
</script>

<ToolPage name="Yunicode" tool={theThing} {page} />

{#snippet page(storage: ToolStorage)}
	<h2>Bibliothèque</h2>
	<TextInput bind:value={search} placeholder="Recherchez ici..." />

	{@render dbView(
		"Alphabets",
		alphabetsDB,
		(font, variant) => {
			cAlphabet.font = font as typeof cAlphabet.font;
			cAlphabet.variant = variant as typeof cAlphabet.variant;
		},
		(font, variant) =>
			getVariant(
				`${font} (${variant})`,
				font as typeof cAlphabet.font,
				variant as "normal",
			),
	)}

	{@render dbView(
		"Modificateurs",
		modifiersDB,
		(modifier, variant) => {
			cModifiers.push(
				(modifiersDB as Record<string, Record<string, string>>)[modifier][
					variant
				],
			);
		},
		(modifier, variant) =>
			getVariant(`${modifier} (${variant})`, "normal", "normal", [
				(modifiersDB as Record<string, Record<string, string>>)[modifier][
					variant
				],
			]),
	)}
{/snippet}

{#snippet dbView(
	title: string,
	db: Record<string, Record<string, any>>,
	onSelect: (id1: string, id2: string) => void,
	showAs: (id1: string, id2: string) => string,
)}
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
{/snippet}

{#snippet theThing(storage: ToolStorage)}
	<Yunicode
		bind:font={storage.font}
		bind:variant={cAlphabet.variant}
		bind:modifiers={cModifiers}
	/>
{/snippet}
