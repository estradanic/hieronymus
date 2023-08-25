import type {ParamMatcher} from "@sveltejs/kit";
import {books} from "$lib/types/bible";

export const match: ParamMatcher = (param) => {
	const [book, rest] = param.split("-");
	const [chapter, verse] = rest.split(":");
	const intRegex = /^\d+$/;

	return (books as readonly string[]).includes(book) && intRegex.test(chapter) && intRegex.test(verse);
};
