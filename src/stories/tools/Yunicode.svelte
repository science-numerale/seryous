<script lang="ts">
	import { onMount } from "svelte";
	import getVariant, {
		fonts,
		type Font,
		type Variant,
	} from "./unicodeVariants";
	import Button from "../basic/Button.svelte";
    import CopyButton from "../CopyButton.svelte";

	let {
		text = $bindable(""),
		font = $bindable("normal"),
		variant = $bindable("normal"),
		verlan = $bindable(false),
	}: {
		text?: string;
		font?: Font;
		variant?: Variant<Font>;
		verlan?: boolean;
	} = $props();

	let make = (s: string) => getVariant(s, font, variant, verlan);

	onMount(() => {
		if (text) text = make(text);
	});

	let area: HTMLTextAreaElement;
	function pressed(e: InputEvent) {
		if (e.data) {
			e.preventDefault();
			let start = area.selectionStart;
			let end = area.selectionEnd;
			let newdata = make(e.data);
			text = text?.slice(0, start) + newdata + text?.slice(end);
			let newcarret = start + (verlan ? 0 : newdata.length);
			setTimeout(() => {
				area.setSelectionRange(newcarret, newcarret);
			});
			console.log(e);
		}
	}

	let rnd = Math.random().toString();

	let copied = $state(false);
</script>

<div>
	<select
		bind:value={font}
		oninput={() => {
			if (!(font in Object.keys(fonts[font]))) {
				variant = "normal";
			}
		}}
	>
		{#each Object.keys(fonts) as (typeof font)[] as key}
			<option value={key}>{getVariant(key, key, "normal")}</option>
		{/each}
	</select>
	<select bind:value={variant}>
		{#each Object.keys(fonts[font]) as (typeof variant)[] as key}
			<option value={key}>{getVariant(key, font, key)}</option>
		{/each}
	</select>
	<input type="checkbox" bind:checked={verlan} id={rnd + "verlan"} /><label
		for={rnd + "verlan"}>Verlan</label
	>

	<br />

	<textarea
		bind:value={text}
		bind:this={area}
		onbeforeinputcapture={pressed}
		placeholder="Choisissez votre police, puis écrivez"
	></textarea>

	<br />

	<CopyButton {text} />
</div>
