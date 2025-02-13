<script lang="ts">
	import TextInput from "../../../components/basic/inputs/TextInput.svelte";
	import Button from "../../../components/basic/Button.svelte";
	import Tool from "../Tool.svelte";
	import type { Snippet } from "svelte";

	let {
		children,
		message,
	}: {
		children?: Snippet;
		message: string;
	} = $props();

	// Storage
	let def = {
		draft: {
			username: `Utilisateur n${Math.random().toFixed(3).toString().slice(2)}`,
			text: "",
		},
		notifications: false,
	};
	let storage = $state(def);

	// Send messages
	let topic = $state("seryous");
	function send() {
		fetch(`https://ntfy.sh/${topic}`, {
			method: "POST",
			headers: {
				Title: storage.draft.username,
			},
			body: message,
		});
		storage.draft.text = "";
	}
</script>

<Tool bind:storage name="envoYeur" small={true} title="envoYeur">
	<div>
		{@render children?.()}
	</div>
	<hr />
	<label>
		Nom d'utilisateur : <TextInput bind:value={storage.draft.username} />
	</label>
	<Button onClick={send}>Envoyer</Button>
</Tool>
