<script>
	import { onMount } from "svelte";
	import selectedVerse from "$lib/stores/selectedVerse";
	import hoveredVerse from "$lib/stores/hoveredVerse";

	/** @type {string} */
	export let id;

	onMount(() => {
		if (window.location.hash.slice(1) === id) {
			selectedVerse.set(id);
		}
	});

</script>

<a
	href="#{id}"
	on:mouseenter={() => $hoveredVerse = id}
	on:mouseleave={() => $hoveredVerse = undefined}
	class="root"
	class:hovered={$hoveredVerse === id}
	class:selected={$selectedVerse === id}
>
	<sup style:color="blue">{id.split(":")[1]}</sup>
	<slot/>
</a>
&nbsp;

<style>
	.root {
		color: black;
		appearance: none;
		text-decoration: none;
	}
	.selected {
		background-color: yellow;
	}
	.hovered {
		background-color: lightgray;
	}
</style>