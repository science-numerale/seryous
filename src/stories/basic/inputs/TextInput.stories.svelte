<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import TextInput from "./TextInput.svelte";
	import { defaultStoryParams } from "../../storiesUtils";

	const { Story } = defineMeta({
		...defaultStoryParams,
		title: "Basic/Inputs/TextInput",
		component: TextInput,
	});
</script>

<Story name="Default" />
