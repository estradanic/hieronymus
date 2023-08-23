import { writable } from "svelte/store";

const hoveredVerse = writable<string | undefined>(undefined);

export default hoveredVerse;
