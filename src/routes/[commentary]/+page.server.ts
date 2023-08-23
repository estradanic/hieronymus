import type {Commentary} from "$lib/stores/selectedCommentary";

const commentaries = {
	lapide: {
		"Mt-1:1": "This is lapide commentary on Mt-1:1",
		"Mt-1:2": "This is lapide commentary on Mt-1:2",
		"Mt-1:3": "This is lapide commentary on Mt-1:3",
	},
	origen: {
		"Mt-1:1": "This is origen commentary on Mt-1:1",
		"Mt-1:2": "This is origen commentary on Mt-1:2",
		"Mt-1:3": "This is origen commentary on Mt-1:3",
	},
	chrysostom: {
		"Mt-1:1": "This is chrysostom commentary on Mt-1:1",
		"Mt-1:2": "This is chrysostom commentary on Mt-1:2",
		"Mt-1:3": "This is chrysostom commentary on Mt-1:3",
	},
};

export function load({ params: {commentary} }: { params: { commentary: Commentary } }) {
	return {
		commentary: {
			name: commentary,
			verses: commentaries[commentary],
		},
	};
}
