import { writable } from "svelte/store";

export const commentaries = ["lapide", "origen", "chrysostom"] as const;
export type Commentary = (typeof commentaries)[number];

export function isCommentary(str: string | null): str is Commentary {
	return !!str && commentaries.includes(str as any);
}

const selectedCommentary = writable<Commentary>("lapide", function start(set) {
	function updateFromSearch() {
		const commentary = new URLSearchParams(window.location.search)
			.get("commentary");
		if (isCommentary(commentary)) {
			set(commentary);
			return;
		}
		set("lapide");
	}

	window.addEventListener("popstate", updateFromSearch);

	return function stop() {
		window.removeEventListener("popstate", updateFromSearch);
	}
});

export default selectedCommentary;
