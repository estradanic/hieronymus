<script lang="ts">
	import { page } from "$app/stores";
	import Verse from "$lib/components/Verse.svelte";

	export let data;
</script>

<div class="content">
	<div class="panel">
		<h4 class="title">{$page.params.verse.split(":").slice(0, 2).join(" ")}</h4>
		{#if !data.scripture}
			<p>No scripture available for this verse.</p>
		{:else}
			{#each Object.keys(data.scripture) as id}
				<Verse type="scripture" {id}>
					{@html data.scripture[id]}
				</Verse>
			{/each}
		{/if}
	</div>
	{#if $page.params.verse}
		<div class="divider" />
		<div class="panel">
			<h4 style:text-transform="capitalize">{$page.params.commentaryName}</h4>
			{#if !data.commentary}
				<p>No commentary available for this verse.</p>
			{:else}
				{#each Object.keys(data.commentary) as id}
					<Verse type="commentary" {id}>
						{@html data.commentary[id]}
					</Verse>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style>
	@font-face {
		font-family: bible;
		src: url(/bible.ttf);
	}
	.content :global(.incipit) {
		font-family: bible;
		font-size: 1.5rem;
		color: firebrick;
		font-weight: bold;
	}
	.content {
		display: flex;
		flex-direction: row;
		font-size: 1.2em;
		line-height: 1.5em;
		padding: 4rem;
		font-family: bible;
		height: calc(100vh - 7rem);
		box-sizing: border-box;
	}
	.content :global(blockquote) {
		font-style: italic;
	}
	.panel {
		height: 100%;
		flex-basis: 50%;
		flex-shrink: 0;
		overflow-y: auto;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.panel::-webkit-scrollbar {
		display: none;
	}
	.divider {
		flex-basis: 2rem;
		flex-shrink: 0;
		flex-grow: 0;
	}
	.title {
		position: sticky;
		top: 0;
	}
</style>
