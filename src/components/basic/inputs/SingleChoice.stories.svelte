<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import SingleChoice from "./SingleChoice.svelte";

	const { Story } = defineMeta({
		title: "Basic/Inputs/SingleChoice",
		component: SingleChoice,
		tags: ["autodocs"]
	});
</script>

<Story name="Lorem" args={{options: "Lorem Impsum Dolor Sit Amet".split(" ")}} />
