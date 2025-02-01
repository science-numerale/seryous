<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Button from "./Button.svelte";
    import { defaultStoryParams } from "../storiesUtils";

	const { Story } = defineMeta({
		...defaultStoryParams,
		title: "Basic/Button",
		component: Button,
	});
</script>

<Story name="Default" args={{ children }} />
<Story name="Disabled" args={{ children, disabled: true }} />

{#snippet children()}
	Bonjour !
{/snippet}
