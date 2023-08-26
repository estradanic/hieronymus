<script lang="ts">
	import { page } from "$app/stores";
	import type { Chapter, Commentary } from "$lib/types/bible";
	import CommentarySelector from "$lib/components/CommentarySelector.svelte";
	import Verse from "$lib/components/Verse.svelte";
	import Layout from "../+layout.svelte";

	export let data;
	let commentary: Commentary;
	let chapter: Chapter;

	$: commentary = $page.params.commentary as Commentary;
	$: chapter = $page.params.chapter as Chapter;
</script>

<div class="content">
	<div class="panel scripture">
		<h4 class="title">{chapter.split(":").slice(0, 2).join(" ").replaceAll("_", " ")}</h4>
		<div class="text">
			{#if !data.scripture}
				<span>No scripture available for this verse.</span>
			{:else}
				{#each Object.keys(data.scripture) as id}
					<Verse type="scripture" {id}>
						{@html data.scripture[id]}
					</Verse>
				{/each}
			{/if}
		</div>
	</div>
	<div class="divider" />
	<div class="panel">
		<CommentarySelector value={commentary} />
		<div class="text">
			{#if !data.commentary}
				<span>No commentary available for this verse.</span>
			{:else}
				{#each Object.keys(data.commentary) as id}
					<Verse type="commentary" {id}>
						{@html data.commentary[id]}
					</Verse>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	@font-face {
		font-family: bible;
		src: url(/bible.ttf);
	}
	.content :global(.incipit) {
		font-size: 1.5rem;
		color: firebrick;
		font-weight: bold;
	}
	.content {
		display: flex;
		flex-direction: row;
		font-size: 1.2em;
		line-height: 2em;
		padding: 2rem;
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
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	.scripture {
  		box-shadow: 5px 0px 5px -5px #AAA;
	}
	.text::-webkit-scrollbar {
		display: none;
	}
	.text {
		flex-basis: 100%;
		width: 100%;
		overflow-y: auto;
		flex-shrink: 1;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.divider {
		flex-basis: 2rem;
		flex-shrink: 0;
		flex-grow: 0;
	}
	.title {
		width: 100%;
		flex-shrink: 0;
	}
</style>
