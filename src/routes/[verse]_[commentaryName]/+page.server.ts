import type { Book, Commentary, Verse } from "$lib/types/bible";

interface Params {
	params: {
		commentaryName: Commentary;
		verse: Verse;
	};
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

interface Return {
	commentary: Record<Verse, string>;
	scripture: Record<Verse, string>;
}

export async function load({ params: { commentaryName, verse }, fetch }: Params): Promise<Return> {
	const [book, rest] = verse.split("-") as [Book, string];
	const chapter = Number(rest.split(":")[0]);

	const commentaryPath = `/commentaries/${commentaryName}/${book}/${chapter}.html`;
	const commentaryResponse = await fetch(commentaryPath);
	const commentaryHtmlText = await commentaryResponse.text();
	const lines = commentaryHtmlText.split("<!---->");
	const commentary: Record<Verse, string> = {};
	lines.forEach((line, index) => {
		commentary[`${book}-${chapter}:${index + 1}`] = line;
	});

	const scripturePath = `/scripture/${book}/${chapter}.html`;
	const scriptureResponse = await fetch(scripturePath);
	const scriptureHtmlText = await scriptureResponse.text();
	const scriptureLines = scriptureHtmlText.split("<!---->");
	const scripture: Record<Verse, string> = {};
	scriptureLines.forEach((line, index) => {
		scripture[`${book}-${chapter}:${index + 1}`] = line;
	});

	return {
		commentary,
		scripture
	};
}
