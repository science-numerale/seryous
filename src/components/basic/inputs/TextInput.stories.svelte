<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import TextInput from "./TextInput.svelte";

	const { Story } = defineMeta({
		title: "Basic/Inputs/TextInput",
		component: TextInput,
		tags: ["autodocs"]
	});
</script>

<Story name="Default" />
