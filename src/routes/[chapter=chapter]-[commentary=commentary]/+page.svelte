<script lang="ts">
	import { page } from "$app/stores";
	import type { Chapter, Commentary } from "$lib/types/bible";
	import CommentarySelector from "$lib/components/CommentarySelector.svelte";
	import Verse from "$lib/components/Verse.svelte";

	export let data;

	let commentary: Commentary;
	let chapter: Chapter;
	let scriptureDiv: HTMLDivElement;
	let commentaryDiv: HTMLDivElement;
	let contentDiv: HTMLDivElement;
	let startX: number;
	let startWidth: number;

	const MIN_WIDTH = 300 as const;
	function drag(e: MouseEvent) {
		e.preventDefault();
		const diffX = e.pageX - startX;
		const newWidth = startWidth + diffX;
		if (newWidth < MIN_WIDTH || newWidth > contentDiv.offsetWidth - MIN_WIDTH) return;

		scriptureDiv.style.flexBasis = `${newWidth}px`;
		commentaryDiv.style.flexBasis = `calc(100% - ${newWidth}px)`;
	}

	function stopDrag() {
		document.removeEventListener("mousemove", drag);
		document.removeEventListener("mouseup", stopDrag);
	}

	function startDrag(e: MouseEvent) {
		startX = e.pageX;
		startWidth = scriptureDiv.offsetWidth;
		document.addEventListener("mousemove", drag);
		document.addEventListener("mouseup", stopDrag);
	}

	$: commentary = $page.params.commentary as Commentary;
	$: chapter = $page.params.chapter as Chapter;
</script>

<div class="content" bind:this={contentDiv}>
	<div class="panel scripture" bind:this={scriptureDiv}>
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
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<div role="separator" class="divider" on:mousedown={startDrag} />
	<div class="panel commentary" bind:this={commentaryDiv}>
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
		flex-basis: 1rem;
		flex-shrink: 0;
		flex-grow: 0;
		cursor: col-resize;
		transition: opacity 1s;
		background-color: firebrick;
		opacity: 0;
		border: 4px solid #f5f5f5;
		border-radius: 8px;
	}
	.divider:hover {
		opacity: 1;
	}
	.title {
		width: 100%;
		flex-shrink: 0;
	}
</style>
