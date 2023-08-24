<script>
	import { page } from "$app/stores";
	import Verse from "$lib/components/Verse.svelte";

	export let data;
</script>

<div class="content">
	<div class="scripture-panel">
		{#each Object.keys(data.scripture) as id}
			<Verse {id}>
				{@html data.scripture[id]}
			</Verse>
		{/each}
	</div>
	{#if $page.params.verse}
		<div class="divider" />
		<div class="commentary-panel">
			{#each Object.keys(data.commentary) as id}
				<Verse {id}>
					{@html data.commentary[id]}
				</Verse>
			{/each}
		</div>
	{/if}
</div>

<style>
	.content {
		display: flex;
		flex-direction: row;
		font-size: 1.2em;
		line-height: 1.5em;
		padding: 4rem;
	}
	.scripture-panel {
		flex-basis: 50%;
		flex-grow: 1;
		flex-shrink: 0;
	}
	.divider {
		flex-basis: 2rem;
		flex-shrink: 0;
		flex-grow: 0;
	}
	.commentary-panel {
		flex-basis: 50%;
		flex-shrink: 0;
	}
</style>
