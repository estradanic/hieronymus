<script>
	import {dev} from "$app/environment";
	import {inject} from "@vercel/analytics";

	inject({mode: dev ? "development": "production"});
</script>

<header>
	<h1><a href="/">Hieronymus</a></h1>
</header>
<slot />

<style>
	:global(body) {
		background-color: #f5f5f5;
		margin: 0.5rem;
	}
	:global(*) {
		scroll-behavior: smooth;
	}
	@font-face {
		font-family: hieronymus;
		src: url(/hieronymus.ttf);
	}
	@font-face {
		font-family: bible;
		src: url(/bible.ttf);
	}
	header {
		padding: 0 2rem;
		height: 6rem;
		display: flex;
		justify-content: space-between;
		box-shadow: 0px 6px 3px -3px firebrick;
	}
	h1 {
		margin: auto 0;
	}
	a {
		text-decoration: none;
		appearance: none;
		color: firebrick;
		font-family: hieronymus;
		font-weight: normal;
	}
</style>
