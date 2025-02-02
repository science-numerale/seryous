<script lang="ts" module>
	import Yunicode from "./Yunicode.svelte";
	import { defineMeta } from "@storybook/addon-svelte-csf";

	let { Story } = defineMeta({
		title: "Tools/Yunicode",
		component: Yunicode,
		tags: ["autodocs"],
	});
</script>

<Story name="Default" />
