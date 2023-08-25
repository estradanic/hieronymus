import type {ParamMatcher} from "@sveltejs/kit";
import {commentaries} from "$lib/types/bible";

export const match: ParamMatcher = (param) => {
	return (commentaries as readonly string[]).includes(param);
};
