<script lang="ts">
	import { page } from "$app/stores";
	import type { Chapter, Commentary } from "$lib/types/bible";
	import type {Return} from "./+page.server";
	import CommentarySelect from "$lib/components/CommentarySelect.svelte";
	import Verse from "$lib/components/Verse.svelte";

	export let data: Return;

	let commentary: Commentary;
	let chapter: Chapter;
	let scriptureDiv: HTMLDivElement;
	let commentaryDiv: HTMLDivElement;
	let contentDiv: HTMLDivElement;
	let startX: number;
	let startWidth: number;
	let abbreviation: string;

	const MIN_SCRIPTURE_WIDTH = 200 as const;
	const MIN_COMMENTARY_WIDTH = 300 as const;
	function drag(e: MouseEvent) {
		e.preventDefault();
		const diffX = e.pageX - startX;
		const newWidth = startWidth + diffX;
		if (newWidth < MIN_SCRIPTURE_WIDTH || newWidth > contentDiv.offsetWidth - MIN_COMMENTARY_WIDTH)
			return;

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

	function snapLeft() {
		scriptureDiv.style.flexBasis = `${MIN_SCRIPTURE_WIDTH}px`;
		commentaryDiv.style.flexBasis = `calc(100% - ${MIN_SCRIPTURE_WIDTH}px)`;
	}

	function snapCenter() {
		scriptureDiv.style.flexBasis = `50%`;
		commentaryDiv.style.flexBasis = `50%`;
	}

	function snapRight() {
		scriptureDiv.style.flexBasis = `calc(100% - ${MIN_COMMENTARY_WIDTH}px)`;
		commentaryDiv.style.flexBasis = `${MIN_COMMENTARY_WIDTH}px`;
	}

	$: commentary = $page.params.commentary as Commentary;
	$: chapter = $page.params.chapter as Chapter;
	$: abbreviation = $page.url.hash?.split("-")[1] ?? $page.url.pathname.split("-")[0].replace("/", "");
</script>

<title>{abbreviation}</title>
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
	<div aria-hidden class="divider" on:mousedown={startDrag}>
		<div aria-hidden class="snap left" on:click={snapLeft}>&lt;</div>
		<div aria-hidden class="snap center" on:click={snapCenter}>:::</div>
		<div aria-hidden class="snap right" on:click={snapRight}>&gt;</div>
	</div>
	<div class="panel commentary" bind:this={commentaryDiv}>
		<CommentarySelect value={commentary} />
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
	@media screen and (max-width: 800px) {
		.divider {
			visibility: hidden;
			flex-basis: 0.5rem;
		}
	}
	.divider {
		flex-basis: 1rem;
		flex-shrink: 0;
		flex-grow: 0;
		cursor: col-resize;
		transition: opacity 500ms;
		background-color: firebrick;
		opacity: 0;
		border: 4px solid #f5f5f5;
		border-radius: 8px;
		position: relative;
	}
	.divider > .snap {
		position: absolute;
		color: #f5f5f5;
		background-color: firebrick;
		cursor: pointer;
		padding: 1rem;
		top: 50%;
	}
	.divider > .snap:hover {
		background-color: rgb(148, 4, 4);
	}
	.divider > .snap.left {
		right: 100%;
		border-radius: 4px 0 0 4px;
		border-right: 1px solid #f5f5f5;
	}
	.divider > .snap.center {
		width: 1rem;	
		padding: 1rem 0;
		text-align: end;
	}
	.divider > .snap.right {
		left: 100%;
		border-radius: 0 4px 4px 0;
		border-left: 1px solid #f5f5f5;
	}
	.divider:hover {
		opacity: 1;
	}
	.title {
		width: 100%;
		flex-shrink: 0;
	}
</style>
