<script>
	import selectedVerse from "$lib/stores/selectedVerse";
	import Verse from "$lib/components/Verse.svelte";

	export let data;

	const verses = /** @type {const} */ ({
		"Matthew-1:1": "THE book of the generation of Jesus Christ, the son of David, the son of Abraham:",
		"Matthew-1:2": "Abraham begot Isaac. And Isaac begot Jacob. And Jacob begot Judas and his brethren.",
		"Matthew-1:3": "And Judas begot Phares and Zara of Thamar. And Phares begot Esron. And Esron begot Aram.",
	});
</script>

<div class="content">
	<div class="scripture-panel">
		{#each Object.keys(verses) as id}
			<Verse id={id}>
				{verses[id]}
			</Verse>
		{/each}
	</div>
	{#if $selectedVerse}
		<div class="divider"/>
		<div class="commentary-panel">
			<h4>{data.commentary.name}</h4>
			{#each Object.keys(data.commentary.verses) as id}
				<Verse id={id}>
					{@html data.commentary.verses[id]}
				</Verse>
			{/each}
		</div>
	{/if}
</div>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: row;
	}
	.scripture-panel {
		flex-basis: 50%;
		flex-grow:1;
		flex-shrink: 0;
	}
	.divider {
		background-color: black;
		height: 100%;
		flex-basis: 2px;
		flex-shrink: 0;
		flex-grow: 0;
	}
	.commentary-panel {
		flex-basis: 50%;
		flex-shrink: 0;
	}
</style>
