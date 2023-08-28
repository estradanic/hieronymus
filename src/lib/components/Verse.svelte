<script lang="ts">
	import hoveredVerse from "$lib/stores/hoveredVerse";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import type { Verse } from "$lib/types/bible";

	export let id: Verse;
	export let type: "scripture" | "commentary";

	let verse: HTMLSpanElement;

	function navigateToVerse() {
		if (document.getSelection()?.type === "Range") return;
		const chapter = $page.params.chapter;
		const route = `/${chapter}-${$page.params.commentary}`;
		const otherType = type === "scripture" ? "commentary" : "scripture";
		const hash = `${otherType}-${id}`;
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
			setTimeout(() => {
				const top = verse.getBoundingClientRect().top;
				const parent = verse.parentElement!;
				parent.scrollTo({
					top: top - parent.getBoundingClientRect().top,
					behavior: "instant",
				});
			})
		}
	});
</script>

<span
	bind:this={verse}
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
	.hovered {
		text-decoration: underline;
		text-decoration-thickness: 3px;
		text-decoration-color: lightblue;
	}
	.selected {
		text-decoration: underline;
		text-decoration-color: yellow;
		text-decoration-thickness: 3px;
	}
	sup {
		color: firebrick;
	}
</style>
