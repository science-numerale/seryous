<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Button from "./Button.svelte";

	const { Story } = defineMeta({
		title: "Basic/Button",
		component: Button,
		tags: ["autodocs"],
	});
</script>

<Story name="Default" args={{ children }} />
<Story name="Disabled" args={{ children, disabled: true }} />

{#snippet children()}
	Bonjour !
{/snippet}
