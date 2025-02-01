<script lang="ts">
	import Button from "../../../stories/basic/Button.svelte";
import getVariant, { fonts, type Font, type Variant } from "../../../stories/tools/unicodeVariants";
	import Yunicode from "../../../stories/tools/Yunicode.svelte";

	function keys<T extends Record<string, any>>(
		obj: T,
	): (T extends T ? keyof T : never)[] {
		return Object.keys(obj) as (T extends T ? keyof T : never)[];
	}

	let cFont: Font = $state("normal");
	let cVariant: Variant<Font> = $state("normal");
</script>

<Yunicode bind:font={cFont} bind:variant={cVariant} />

{#each keys(fonts) as font}
	<ul>
		{#each keys(fonts[font]) as variant}
			<li><Button variant="span" onClick={()=>{cFont = font; cVariant = variant}}>{getVariant(`${font} (${variant})`, font, variant as "normal")}</Button></li>
		{/each}
	</ul>
{/each}

