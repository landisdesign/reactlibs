import { loadWords, wordsReducer } from './words';

describe('wordsReducer', () => {
	
	test('loadWords', () => {
		const words = [
			{id: 'a', title: 'A word', words: ['a1', 'a2', 'a3']},
			{id: 'b', title: 'B word', words: ['b1', 'b2', 'b3']},
			{id: 'c', title: 'C word', ref: 'a'},
			{id: 'd', title: 'D word', ref: 'b'}
		];

		const initialConfig = {};
		const expectedConfig = {
			a: {...words[0]},
			b: {...words[1]},
			c: {...words[2], words: words[0].words},
			d: {...words[3], words: words[1].words}
		}

		delete expectedConfig.c.ref;
		delete expectedConfig.d.ref;

		const resultConfig = wordsReducer(initialConfig, loadWords(words));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('bogus action', () => {
		const initialConfig = {};
		const expectedConfig = {};

		const resultConfig = wordsReducer(initialConfig, {type: 'foobar'});
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).toBe(initialConfig);
	});
});