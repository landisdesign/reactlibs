import { loadStories, storiesReducer } from './stories';

describe('storiesReducer', () => {
	
	test('loadStories', () => {

		const stories = [
			{id: 'a', title: 'A', fields: ['a', 'b', 'd'], template: 'Template A'},
			{id: 'b', title: 'B', fields: ['d', 'a', 'c'], template: 'Template B'}
		];

		const initialConfig = {stories: [], ids: {}};
		const resultConfig = storiesReducer(initialConfig, loadStories(stories));

		expect(resultConfig).toEqual({
			stories: stories,
			idMap: {
				a: 0,
				b: 1
			}
		});
		expect(resultConfig).not.toBe(initialConfig);
	});

});