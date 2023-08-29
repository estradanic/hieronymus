import type { Book, Chapter, Commentary, Verse } from "$lib/types/bible";

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

interface Params {
	params: {
		commentary: Commentary;
		chapter: Chapter;
	};
	fetch: Fetch;
}

export interface Return {
	commentary?: Record<Verse, string>;
	scripture?: Record<Verse, string>;
}

async function getScripture(
	book: Book,
	chapter: number,
	fetch: Fetch
): Promise<Record<Verse, string> | undefined> {
	const response = await fetch(`/scripture/${book}/${chapter}.html`);
	if (response.status !== 200) {
		return undefined;
	}
	const htmlText = await response.text();
	const lines = htmlText.split("<!---->");
	const scripture: Record<Verse, string> = {};
	lines.forEach((line, index) => {
		scripture[`${book}:${chapter}:${index + 1}`] = line;
	});

	return scripture;
}

async function getCommentary(
	commentary: Commentary,
	book: Book,
	chapter: number,
	fetch: Fetch
): Promise<Record<Verse, string> | undefined> {
	const response = await fetch(`/commentaries/${commentary}/${book}/${chapter}.html`);
	if (response.status !== 200) {
		return undefined;
	}
	const htmlText = await response.text();
	const lines = htmlText.split("<!---->");
	const commentaries: Record<Verse, string> = {};
	lines.forEach((line, index) => {
		commentaries[`${book}:${chapter}:${index + 1}`] = line;
	});

	return commentaries;
}

export async function load({ params: { commentary, chapter }, fetch }: Params): Promise<Return> {
	const [book, chapterString] = chapter.split(":") as [Book, string];
	const chapterNumber = Number(chapterString);

	return {
		commentary: await getCommentary(commentary, book, chapterNumber, fetch),
		scripture: await getScripture(book, chapterNumber, fetch)
	};
}
