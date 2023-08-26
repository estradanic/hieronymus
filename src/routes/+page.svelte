<script lang="ts">
	import { books } from "$lib/types/bible";
</script>

<div class="books">
	{#each books as book}
		<a class="book" href="/{book}:1-lapide">{book.replaceAll("_", " ")}</a>
	{/each}
</div>

<style>
	.books {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 2rem;
	}
	.book {
		text-decoration: none;
		appearance: none;
		color: firebrick;
		font-family: bible;
		font-weight: normal;
		font-size: 1.5rem;
		margin: 1rem;
	}
</style>