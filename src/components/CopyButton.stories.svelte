<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import CopyButton from "./CopyButton.svelte";

	let { Story } = defineMeta({
		title: "CopyButton",
		component: CopyButton,
		tags: ["autodocs"],
	});
</script>

<Story name="Default" args={{text: "Voilà"}} />
