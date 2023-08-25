<header>
	<h1>Heironymus</h1>
</header>
<slot />

<style>
	:global(body) {
		background-color: #F5F5F5;
		margin: 0.5rem;
	}
	@font-face {
		font-family: heironymus;
		src: url(/heironymus.ttf);
	}
	header {
		padding: 0 2rem;
		height: 6rem;
		display: flex;
	}
	h1 {
		margin: auto 0;
		font-family: heironymus;
		font-weight: normal;
		color: firebrick;
		border-bottom: 2px solid firebrick;
	}
</style>