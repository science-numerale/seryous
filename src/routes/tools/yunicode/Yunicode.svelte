<script lang="ts">
	import Button from "../../../components/basic/Button.svelte";
	import Details from "../../../components/basic/Details.svelte";
	import CopyButton from "../../../components/CopyButton.svelte";
	import Tool from "../Tool.svelte";
	import Bibliotheque from "./Bibliotheque.svelte";
	import Editing from "./Editing.svelte";
	import type { WritingParams } from "./unicodeStuff";
	import getVariant, { getDefaultParams } from "./unicodeStuff";
	import WritingParamsSelector from "./WritingParamsSelector.svelte";

	const def: {
		text: string;
		current: WritingParams;
	} = {
		text: "",
		current: getDefaultParams(),
	};
	let storage: {
		text: string;
		current: WritingParams;
	} = $state(def);
</script>

<Tool bind:storage name="Yunicode">
	<h1>{getVariant("Yunicode", storage.current)}</h1>
	<div
		style="display: inline-flex; flex-direction: column; gap: 1rem; width: 100%;"
	>
		<div style="display: inline-flex; flex-wrap: wrap; gap: 1rem; width: 100%;">
			<div>
				<WritingParamsSelector bind:params={storage.current} />
			</div>
			<div style="flex-grow: 1; flex-basis: min-content;">
				<label
					><input
						type="checkbox"
						bind:checked={storage.current.verlan}
					/>Verlan</label
				>
				<Editing
					bind:value={storage.text}
					replace={(s) => getVariant(s, storage.current)}
					verlan={storage.current.verlan}
				/>
				{#key storage.text}
					<CopyButton
						text={storage.text}
						style="width: 100%; box-sizing: border-box;"
					/>
				{/key}
			</div>
		</div>

		<div style="border: solid 2px black; padding: 0.5rem;">
			<Details summary="Bibliothèque">
				<Bibliotheque bind:writingParams={storage.current} />
			</Details>
		</div>

		<div>
			<!-- Hmm... A bit messy -->
			<Button
				disabled={JSON.stringify(storage) === JSON.stringify(def)}
				label="Réinitialiser"
				onClick={() => {
					storage = def;
				}}
			/>
		</div>
	</div>
</Tool>
