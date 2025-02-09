<script lang="ts">
	import { getMessages, onMessage, type Message } from "./ntfy";
	import TextInput from "../../../components/basic/inputs/TextInput.svelte";
	import Tool from "../Tool.svelte";
	import Button from "../../../components/basic/Button.svelte";

	let messages: Message[] = $state([]);
	let topic = $state("seryous");

	$effect(() => {
		getMessages(topic).then((e) => {
			messages = e;
		});
		return onMessage(topic, (e) => messages.push(e));
	});

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
	<small>
		L'historique ne garde volontairement que les <strong>{maxMessages}</strong>
		dernier messages.
		<br />
		Tous les messages postés ici sont <b>publiques</b> !!! Même ceux disparus.
	</small>

	<ul style="display: flex; flex-direction: column; gap: .5rem;" class="box">
		{#if messages.length === 0}
			<li style="display: block;">Il n'y a aucun message.</li>
		{/if}
		{#each messages as message}
			{@const date = new Date(message.time * 1000)}
			<li style="display: flex; flex-direction: column;">
				<span>
					{date.getHours()}h {date.getMinutes()}m {date.getSeconds()}s
					<strong>{message.title}</strong> :
				</span>
				<i style="padding-left: 1rem; display: inline-block;">{message.message}</i>
			</li>
		{/each}
	</ul>

	<div style="display: flex; flex-direction: column; gap: 1rem;">
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
