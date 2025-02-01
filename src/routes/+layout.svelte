<script lang="ts">
	import { base } from "$app/paths";
	import "../app.css";
    import { toolsLinks } from "./tools/tools";

	let { children } = $props();
</script>

<div class="app">
	<header>
		<nav>
			<ul>
				<li>
					<a href="{base}/">Acceuil</a>
				</li>
				{#each Object.entries(toolsLinks) as [name, url]}
					<li>
						<a href="{base}/tools/{url}">{name}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		Seryous est un projet sérieux qui offre des outils pratiques, à l'inverse de <a
			href="https://science-numerale.github.io/yuser/">Yuser</a
		>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		height: 100dvh;
	}

	header,
	footer {
		padding: 1rem;
	}
	ul {
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1rem;
	}
	li {
		display: inline;
	}

	main {
		flex-grow: 1;
		margin: 0 1rem;
		padding: 1rem;
		overflow: auto;
	}
</style>
