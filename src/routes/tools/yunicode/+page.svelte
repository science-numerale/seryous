<script lang="ts">
	import Button from "../../../components/basic/Button.svelte";
	import TextInput from "../../../components/basic/inputs/TextInput.svelte";
	import Tool from "../Tool.svelte";
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

<Tool name="Yunicode">
	<div style="display: inline-block; position: sticky; top: 0; background: white; max-width: 100%; box-sizing: border-box;">
		<Yunicode
			bind:font={cAlphabet.font}
			bind:variant={cAlphabet.variant}
			bind:modifiers={cModifiers}
		/>
	</div>

	<h2>Bibliothèque</h2>
	<!-- <TextInput bind:value={search} placeholder="Recherchez ici..." /> -->

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
</Tool>

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
				<li>
					<Button
						variant="span"
						onClick={() => {
							onSelect(id1, id2);
						}}>{showAs(id1, id2)}</Button
					>
				</li>
			{/each}
		</ul>
	{/each}
{/snippet}
