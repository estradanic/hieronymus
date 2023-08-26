<header>
	<h1><a href="/">Heironymus</a></h1>
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
		font-family: heironymus;
		src: url(/heironymus.ttf);
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
		font-family: heironymus;
		font-weight: normal;
	}
</style>
