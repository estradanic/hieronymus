<script lang="ts">
	import { books } from "$lib/types/bible";
</script>

{#each books as book}
	<a href="/{book}:1:1-lapide">{book.replace("_", " ")}</a>
	<br />
{/each}
