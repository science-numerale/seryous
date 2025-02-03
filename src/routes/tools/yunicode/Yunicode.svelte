<script lang="ts">
	import { onMount } from "svelte";
	import getVariant, {
		alphabetsDB,
		modifiersDB,
		type Font,
		type Variant,
	} from "./unicodeVariants";
	import CopyButton from "../../../components/CopyButton.svelte";
	import Button from "../../../components/basic/Button.svelte";
	import ModifiersEditor from "./ModifiersEditor.svelte";

	let {
		text = $bindable(""),
		font = $bindable("normal"),
		variant = $bindable("normal"),
		modifiers = $bindable([]),
		verlan = $bindable(false),
	}: {
		text?: string;
		font?: Font;
		variant?: Variant<Font>;
		modifiers?: string[]
		verlan?: boolean;
	} = $props();

	let make = (s: string) =>
		getVariant(
			s,
			font,
			variant,
			modifiers,
			verlan,
		);

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
		}
	}

	let oldVariant: typeof variant;
	$effect(() => {
		if (variant === "srevnela" && oldVariant !== "srevnela") {
			verlan = true;
		} else if (variant !== "srevnela" && oldVariant === "srevnela") {
			verlan = false;
		}
		oldVariant = variant;
	});

	let rnd = Math.random().toString();
</script>

<div style="display: flex; flex-wrap: wrap; gap: 1rem;">
	<div style="display: flex; flex-direction: column; gap: 0.5rem;">
		<div>
			<select
				bind:value={font}
				oninput={() => {
					if (!(font in Object.keys(alphabetsDB[font]))) {
						variant = "normal";
					}
				}}
			>
				{#each Object.keys(alphabetsDB) as (typeof font)[] as key}
					<option value={key}>{getVariant(key, key, "normal")}</option>
				{/each}
			</select>
			<select bind:value={variant}>
				{#each Object.keys(alphabetsDB[font]) as (typeof variant)[] as key}
					<option value={key}>{getVariant(key, font, key)}</option>
				{/each}
			</select>
		</div>

		<ModifiersEditor bind:modifiers />
	</div>

	<div>
		<div style="white-space: nowrap;">
			<input type="checkbox" bind:checked={verlan} id={rnd + "verlan"} /><label
				for={rnd + "verlan"}>Verlan</label
			>
		</div>
		<textarea
			bind:value={text}
			bind:this={area}
			onbeforeinputcapture={pressed}
			placeholder={make("Choisissez votre police, puis écrivez")}
		></textarea>

		<br />

		<CopyButton {text} />
		{#if navigator.share}
			<Button
				onClick={() => {
					navigator.share?.({ text });
				}}>Partager</Button
			>
		{/if}
	</div>
</div>
