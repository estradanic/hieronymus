<script lang="ts">
	import hoveredVerse from "$lib/stores/hoveredVerse";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import type { Verse } from "$lib/types/bible";

	export let id: Verse;
	export let type: "scripture" | "commentary";

	function navigateToVerse() {
		if (document.getSelection()?.type === "Range") return;
		const route = `/${id}-${$page.params.commentary}`;
		const otherType = type === "scripture" ? "commentary" : "scripture";
		const hash = `#${otherType}-${id}`;
		if ($page.url.pathname === route && window.location.hash?.endsWith(id)) {
			return;
		}
		if ($page.url.pathname === route && !window.location.hash?.endsWith(id)) {
			document.getElementById(hash)?.scrollIntoView({behavior: "smooth"});
			return;
		}
		const url = new URL(`${route}${hash}`, window.location.origin);
		goto(url);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === "Space") {
			navigateToVerse();
		}
	}
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
	{#if Number(id.split(":")[1]) > 1}
		<sup>{id.split(":")[1]}</sup>
	{/if}
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
