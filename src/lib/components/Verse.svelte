<script lang="ts">
	import hoveredVerse from "$lib/stores/hoveredVerse";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import type { Verse } from "$lib/types/bible";

	export let id: Verse;
	export let type: "scripture" | "commentary";

	function navigateToVerse(switchSides = true) {
		if (document.getSelection()?.type === "Range") return;
		const chapter = $page.params.chapter;
		const route = `/${chapter}-${$page.params.commentary}`;
		const otherType = type === "scripture" ? "commentary" : "scripture";
		const hash = `${switchSides ? otherType : type}-${id}`;
		const url = new URL(`${route}#${hash}`, window.location.origin);
		goto(url);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === "Space") {
			navigateToVerse();
		}
	}

	onMount(() => {
		if ($page.url.hash?.endsWith(id)) {
			navigateToVerse(false);
		}
	});
</script>

<span
	id="{type}-{id}"
	role="button"
	tabindex="0"
	on:click={navigateToVerse}
	on:keydown={handleKeyDown}
	on:mouseenter={() => ($hoveredVerse = id)}
	on:mouseleave={() => ($hoveredVerse = undefined)}
	class:hovered={$hoveredVerse === id}
	class:selected={$page.url.hash?.endsWith(id)}
	class="verse"
>
	<sup>{id.split(":")[2]}</sup>
	<slot />
</span>
&nbsp;

<style>
	.verse {
		cursor: pointer;
	}
	.verse:active {
		cursor: text;
	}
	.verse :global(a) {
		color: firebrick;
	}
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
		color: firebrick;
	}
</style>
