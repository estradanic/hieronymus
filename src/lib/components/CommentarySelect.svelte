<script lang="ts">
	import Select from "svelte-select";
	import {commentaries} from "$lib/types/bible";
	import type {Commentary} from "$lib/types/bible";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";

	export let value: Commentary;

	let listOpen = false;
	let items = commentaries.map((c) => ({value: c, label: c.replaceAll("_", " ")}));
	let maxOptionWidth: number;

	function navigateToCommentary(commentary: Commentary) {
		const [verse] = $page.url.pathname.split("-");
		goto(`${verse}-${commentary}#${$page.url.hash}`);
	}

	function handleChange(e: CustomEvent) {
		navigateToCommentary(e.detail.value);
	}

	$: maxOptionWidth = Math.max(...items.map((o) => o.label.length));
</script>

<h4>
	<Select
		bind:listOpen
		clearable={false}
		{value}
		{items}
		showChevron
		class="select"
		on:change={handleChange}
		listOffset={0}
		searchable={false}
		--shadow={listOpen ? undefined : "0 2px 0 firebrick"}
		--background="#f5f5f5"
		--border-radius="0"
		--border="none"
		--border-focused="none"
		--border-hover="none"
		--padding="0"
		--font-size="1em"
		--list-shadow="0 2px 0 firebrick, -2px 0 2px lightgray"
		--list-border-radius="0"
		--item-first-border-radius="0"
		--item-padding="0"
		--max-width="{maxOptionWidth}em"
	>
		<span class="arrow" slot="chevron-icon">
			{#if !listOpen}
				▾
			{:else}
				▴
			{/if}
		</span>
		<div slot="item" let:item class="item">
			{item.label}
		</div>
	</Select>
</h4>

<style>
	:global(.select) {
		text-transform: capitalize;
		box-shadow: var(--shadow);
		max-width: var(--max-width);
	}
	:global(.select > .value-container) {
		line-height: 1em;
	}
	:global(.select.select.svelte-select > .value-container > input) {
		cursor: pointer;
	}
	.item {
		background-color: #f5f5f5;
		font-family: bible;
		text-transform: capitalize;
		cursor: pointer;
		color: black;
	}
	.item:hover, .item:focus {
		background-color: firebrick;
		color: white;
	}
	.arrow {
		color: firebrick;
		cursor: pointer;
	}
</style>