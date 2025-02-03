<script lang="ts">
	import Button from "../../../components/basic/Button.svelte";
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
</script>

<Tool name="Yunicode">
	<Yunicode bind:font={cAlphabet.font} bind:variant={cAlphabet.variant} bind:modifiers={cModifiers} />

	<h2>Alphabets</h2>
	{#each keys(alphabetsDB) as font}
		<ul>
			{#each keys(alphabetsDB[font]) as variant}
				<li>
					<Button
						variant="span"
						onClick={() => {
							cAlphabet.font = font;
							cAlphabet.variant = variant;
						}}
						>{getVariant(
							`${font} (${variant})`,
							font,
							variant as "normal",
						)}</Button
					>
				</li>
			{/each}
		</ul>
	{/each}

	<h2>Modificateurs</h2>
	{#each keys(modifiersDB) as modifier}
		<ul>
			{#each keys(modifiersDB[modifier]) as variant}
				<li>
					<Button
						variant="span"
						onClick={() => {
							cModifiers.push(modifiersDB[modifier][variant]);
						}}
						>{getVariant(`${modifier} (${variant})`, "normal", "normal", [
							modifiersDB[modifier][variant],
						])}</Button
					>
				</li>
			{/each}
		</ul>
	{/each}
</Tool>
