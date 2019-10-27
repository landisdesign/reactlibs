const WORDS_LOAD = 'WORDS_LOAD';

function loadWords(wordConfig) {
	return {
		type: WORDS_LOAD,
		words: wordConfig
	};
}

function wordsReducer(state = {}, action) {

	function createWordMap({words}) {

		const {wordMap, referrers} = words.reduce((acc, word) => {
			acc.wordMap[word.id] = word;
			if ('ref' in word) acc.referrers.push(word.id);
			return acc;
		}, {wordMap: {}, referrers: []});

		if (referrers.length) {
			referrers.forEach(id => {
				const word = {...wordMap[id]};
				const refedWord = wordMap[word.ref];
				word.words = refedWord.words;
				delete word.ref;
				wordMap[id] = word;
			});
		}

		return wordMap;
	}

	switch (action.type) {
		case WORDS_LOAD:
			return createWordMap(action);
		default:
			return state;
	}
}

export {loadWords, wordsReducer};