<script>
	import { onMount } from "svelte";
	import selectedVerse from "$lib/stores/selectedVerse";

	/** @type {string} */
	export let id;
	let hovered = false;

	onMount(() => {
		if (window.location.hash.slice(1) === id) {
			selectedVerse.set(id);
		}
	});

</script>

<a
	href="#{id}"
	on:mouseenter={() => hovered = true}
	on:mouseleave={() => hovered = false}
	class="root"
	class:hovered
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