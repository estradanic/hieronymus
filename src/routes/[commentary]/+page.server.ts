import type { Commentary, Verse } from "$lib/types/Bible";

const commentaries: Record<Commentary, Record<Verse, string>> = {
	lapide: {
		"Matthew-1:1": "'The book of the generation' - Thus it is verbally in the Greek, Latin, Syrian, "
			+ "Arabic, Egyptian, and Persian texts. But the Ethiopian has 'The genealogy of Jesus Christ'. "
			+ "Matthew here seems to imitate Moses. Listen to what blessed Peter Damian says in his Sermon on S. Matthew: "
			+ "'As Moses is not improperly placed before the prophets and all who have written anything in the Old Testament, "
			+ "so Matthew rightly takes precedence of all who are found to have written in the New Testament. "
			+ "For as Moses compiled an account of the origin of the world, "
			+ "so has Matthew described the rising newness of the Church, as it were of a spiritual world. "
			+ "Hence it has been provided that, the HOLY SPIRIT guiding the pen, both Moses and S. Matthew "
			+ "placed the same commencement to their respective works, saying, \"The Book of the Generation\"'. "
			+ "For Moses says: 'Thus begins the account of the genealogy and race of Adam, the first formed man'. "
			+ "- The Book of generation of Adam: for Adam was a type of Christ. "
			+ "For as Adam was the father of the mortal life of all men, so is Christ the father of the immortal life of the faithful, "
			+ "as S. Paul teaches in <a href=\"#Romans-5:14\">Romans 5:14</a> and <a href=\"#1Corinthians-15:47\">1 Corinthians 15:47</a>. "
			+ "The Hebrew is תולדות  ספר sepher toledoth, i.e., the book, or catalogue, and enumeration of the generations of Adam. "
			+ "For, in the 5th of Genesis, many, indeed all the generations are given by which the human race was propagated from Adam to Noah and the Flood, "
			+ "whence it is probable that S. Matthew, who alludes to Moses, wrote likewise in Hebrew, in this passage, sepher toledoth, "
			+ " i.e., the book of the generations, in the plural. "
			+ "The LXX, however, in Gen. v., have translated βίβλος γενέσεως, the Book of the generation, in the singular, "
			+ "because the generation of Adam was one, by which he, as it were the patriarch of the whole human race, "
			+ "begat Seth, which generation was afterwards continued by Seth and his posterity, and was propagated as far as Noah. "
			+ "The Greek interpreter of S. Matthew, and the Latin Vulgate, which was translated from the Greek, here followed the LXX, "
			+ "because properly there is related the generation of Christ alone, whose origin indeed is derived from Abraham, "
			+ "through many generations of forefathers, and is brought down to Christ. "
			+ "As, therefore, Adam was the beginning or origin of the old world, "
			+ "so is Christ of the new and better world, whence he is <a href=\"#Isaiah-9:6\">called by Isaiah</a>, 'The Father of the coming age.' "
			+ "Hence also Virgil, following the Cumæan Sibyl, sings thus concerning Him, ",
		"Matthew-1:2": "This is lapide commentary on Mt-1:2",
		"Matthew-1:3": "This is lapide commentary on Mt-1:3",
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
