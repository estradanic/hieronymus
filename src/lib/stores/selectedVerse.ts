import { writable } from "svelte/store";

const selectedVerse = writable<string | undefined>(undefined, function start(set) {
	function updateFromHash() {
		const verse = window.location.hash.slice(1);
		set(verse);
	}

	window.addEventListener("hashchange", updateFromHash);

	return function stop() {
		window.removeEventListener("hashchange", updateFromHash);
	}
});

export default selectedVerse;
