<script lang="ts" module>
	import Yunicode from "./Yunicode.svelte";
	import { defaultStoryParams } from "../storiesUtils";
	import { defineMeta } from "@storybook/addon-svelte-csf";

	let { Story } = defineMeta({
		...defaultStoryParams,
		title: "Tools/Yunicode",
		component: Yunicode,
	})

</script>

<Story name="Default" />
