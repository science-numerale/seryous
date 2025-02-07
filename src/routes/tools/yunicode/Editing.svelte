<script lang="ts">
	let {
		value = $bindable(),
		replace = (s) => s,
		verlan = false,
	}: {
		value: string;
		replace?: (e: string) => string;
		verlan?: boolean
	} = $props();

	let area: HTMLTextAreaElement;
	function pressed(e: InputEvent) {
		if (e.data) {
			e.preventDefault();
			let start = area.selectionStart;
			let end = area.selectionEnd;
			let newdata = replace(e.data);
			value = value?.slice(0, start) + newdata + value?.slice(end);
			let newcarret = start + (verlan ? 0 : newdata.length);
			setTimeout(() => {
				area.setSelectionRange(newcarret, newcarret);
			});
		}
	}
</script>

<textarea
	style="resize: vertical; min-width: 25rem; width: 100%; height: 5rem;"
	bind:value
	bind:this={area}
	onbeforeinputcapture={pressed}
	placeholder={replace("Choisissez votre police, PUIS écrivez")}
></textarea>
