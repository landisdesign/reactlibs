import { initEntries, setEntries, setEntry, clearEntries, entriesReducer } from './entries';

describe('entryReducer', () => {
	
	test('initEntries', () => {

		const stories = [
			{id: 'a', title: 'A', fields: ['a', 'b', 'd'], template: 'Template A'},
			{id: 'b', title: 'B', fields: ['d', 'a', 'c', 'b', 'a'], template: 'Template B'}
		];

		const initialConfig = [];
		const resultConfig = entriesReducer(initialConfig, initEntries(stories));

		expect(resultConfig).toEqual([
			['', '', ''],
			['', '', '', '', '']
		]);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('setEntries', () => {
		const entries = ['a', 'b', 'c', 'd', 'e'];
		const storyIndex = 1;

		const initialConfig = [
			['', '', ''],
			['', '', '', '', '']
		];

		const resultConfig = entriesReducer(initialConfig, setEntries(storyIndex, entries));
		expect(resultConfig).toEqual([
			['', '', ''],
			['a', 'b', 'c', 'd', 'e']
		]);
		expect(resultConfig).not.toBe(initialConfig);
	});
	
	test('setEntry', () => {
		const value = 'a';
		const storyIndex = 1;
		const entryIndex = 2;

		const initialConfig = [
			['', '', ''],
			['', '', '', '', '']
		];

		const resultConfig = entriesReducer(initialConfig, setEntry({storyIndex, entryIndex, value}));
		expect(resultConfig).toEqual([
			['', '', ''],
			['', '', 'a', '', '']
		]);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('clearEntries', () => {
		const storyIndex = 1;

		const initialConfig = [
			['x', 'y', 'z'],
			['a', 'b', 'c', 'd', 'e']
		];

		const resultConfig = entriesReducer(initialConfig, clearEntries(storyIndex));
		expect(resultConfig).toEqual([
			['x', 'y', 'z'],
			['', '', '', '', '']
		]);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test ('Uncaptured action', () => {
		const initialConfig = [
			['x', 'y', 'z'],
			['a', 'b', 'c', 'd', 'e']
		];
		const expectedConfig = initialConfig.map(entries => [...entries]);

		const resultConfig = entriesReducer(initialConfig, {type: 'foobar'});
		expect(resultConfig).toEqual(expectedConfig); // no changes
		expect(resultConfig).toBe(initialConfig); // same object
	});

})