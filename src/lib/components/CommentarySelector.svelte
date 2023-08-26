<script lang="ts">
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { commentaries } from "$lib/types/bible";
	import type { Commentary } from "$lib/types/bible";

	export let value: Commentary;

	let open = false;
	let select: HTMLSelectElement;

	function navigateToCommentary(commentary: Commentary) {
		const [verse] = $page.url.pathname.split("-");
		goto(`${verse}-${commentary}#${$page.url.hash}`);
	}

	function handleSelect(e: Event) {
		const commentary = (e.target as HTMLSelectElement).value as Commentary;
		navigateToCommentary(commentary);
	}

	function handleOpen() {
		open = true;
		document.addEventListener("click", handleClose);
	}

	function handleClose() {
		open = false;
		select.blur();
	}
</script>

<h4>
	<select
		bind:this={select}
		on:focus={handleOpen}
		on:blur={handleClose}
		bind:value
		on:change={handleSelect}
	>
		{#each commentaries as commentary}
			<option value={commentary}>
				{commentary.replaceAll("_", " ")}
			</option>
		{/each}
	</select>
	<span class="arrow">
		{#if !open}
			▾
		{:else}
			▴
		{/if}
	</span>
</h4>

<style>
	h4 {
		width: 100%;
	}
	select {
		text-transform: capitalize;
		appearance: none;
		background-color: #f5f5f5;
		border: none;
		position: relative;
		font-family: bible;
		font-weight: bold;
		font-size: 1em;
		cursor: pointer;
		outline: none;
		border-bottom: 2px solid firebrick;
		padding-right: 1.5rem;
	}
	option {
		appearance: none;
	}
	.arrow {
		transform: translateX(-1rem);
		position: absolute;
		color: firebrick;
		cursor: pointer;
	}
</style>
