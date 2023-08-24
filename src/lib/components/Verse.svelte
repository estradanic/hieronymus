<script lang="ts">
	import hoveredVerse from "$lib/stores/hoveredVerse";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import type { Verse } from "$lib/types/bible";

	export let id: Verse;

	function navigateToVerse() {
		goto(`/${id}_${$page.params.commentaryName}`);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === "Space") {
			navigateToVerse();
		}
	}
</script>

<span
	role="button"
	tabindex="0"
	on:click={navigateToVerse}
	on:keydown={handleKeyDown}
	on:mouseenter={() => ($hoveredVerse = id)}
	on:mouseleave={() => ($hoveredVerse = undefined)}
	class:hovered={$hoveredVerse === id}
	class:selected={$page.params.verse === id}
>
	<sup>{id.split(":")[1]}</sup>
	<slot />
</span>
&nbsp;

<style>
	.selected {
		text-decoration: underline;
		text-decoration-color: yellow;
		text-decoration-thickness: 3px;
	}
	.hovered {
		text-decoration: underline;
		text-decoration-thickness: 3px;
		text-decoration-color: lightblue;
	}
	sup {
		color: blue;
	}
</style>
