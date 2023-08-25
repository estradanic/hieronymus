import type {ParamMatcher} from "@sveltejs/kit";
import {books} from "$lib/types/bible";

export const match: ParamMatcher = (param) => {
	const [book, chapter] = param.split(":");
	const intRegex = /^\d+$/;

	return (books as readonly string[]).includes(book) && intRegex.test(chapter);
};
