<script lang="ts">
	import { untrack } from "svelte";
	import { onMessage, type Message } from "./ntfy";
	import TextInput from "../../../components/basic/inputs/TextInput.svelte";
	import Tool from "../Tool.svelte";
	import Yunicode from "../yunicode/Yunicode.svelte";
	import Button from "../../../components/basic/Button.svelte";

	let messages: Message[] = $state([]);
	let topic = $state("seryous");

	$effect(() =>
		onMessage(`https://ntfy.sh/${topic}/sse`, (e) => messages.push(e)),
	);

	const maxMessages = 10;
	$effect(() => {
		messages;
		messages = messages.sort((a, b) => a.time - b.time);
		if (messages.length > maxMessages) messages = messages.slice(-maxMessages);
	});

	let storage = $state({
		draft: {
			username: `Utilisateur n${Math.random().toFixed(3).toString().slice(2)}`,
			text: "",
		},
	});

	function send() {
		fetch(`https://ntfy.sh/${topic}`, {
			method: "POST",
			headers: {
				Title: storage.draft.username,
			},
			body: storage.draft.text,
		});
		storage.draft.text = "";
	}
</script>

<Tool bind:storage name="mesaYges">
	<div style="display: flex; flex-direction: column; gap: 1rem;">
		{#if messages.length === maxMessages}
			<small>L'historique ne garde volontairement que les {maxMessages} dernier messages.</small>
		{/if}
		<ul>
			{#if messages.length === 0}
				<li style="display: block;">Il n'y a aucun message.</li>
			{/if}
			{#each messages as message}
				{@const date = new Date(message.time * 1000)}
				<li style="display: block;">
					{date.getHours()}:{date.getMinutes()}:{date.getSeconds()}s
					<strong>{message.title}</strong> : <i>{message.message}</i>
				</li>
			{/each}
		</ul>

		<label>
			Nom d'utilisateur : <TextInput bind:value={storage.draft.username} />
		</label>
		<div>
			<TextInput
				variant="input"
				bind:value={storage.draft.text}
				placeholder="Message..."
				onValidate={send}
			/>
			<Button onClick={send}>Envoyer</Button>
		</div>
	</div>
</Tool>
