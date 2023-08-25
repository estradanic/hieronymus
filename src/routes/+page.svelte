<script lang="ts">
	import { books } from "$lib/types/bible";
</script>

{#each books as book}
	<a href="/{book}-1:1_none">{book}</a>
	<br />
{/each}