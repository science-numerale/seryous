<script lang="ts">
	import { toolsLinks } from "./tools/tools";
</script>

<svelte:head>
	<title>serYous</title>
	<meta name="description" content="Accueil de serYous" />
</svelte:head>

<h1>
	Ceci est la page d'accueil de serYous <small>(≠ <a
		href="https://science-numerale.github.io/yuser/">Yuser</a
	>)</small>, et elle n'est pas très intéressante pour l'instant
</h1>
<p>
	Le mieux serait d'aller voir l'avancement des différents outils que propose le
	site, qui sont pour l'instant au nombre de <strong
		>{Object.keys(toolsLinks).length}</strong
	>. Vous pouvez les retrouver dans la barre de navigation. Allez voir également
	le
	<a href="https://github.com/science-numerale/seryous/blob/main/README.md"
		>README</a
	> sur GitHub.
</p>
