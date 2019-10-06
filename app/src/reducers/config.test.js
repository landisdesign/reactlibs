import { fetchConfig, acknowledgeConfigCompletion, configReducer, __test__ as actionMap } from './config';
import { initEntries } from './entries';

actionMap.initEntries = initEntries;

describe('Reducer: config', () => {

	const type = action => action().type;

	const typeMap = Object.values(actionMap).reduce((map, fn) => {
		map[type(fn)] = fn;
		return map;
	}, {});

	describe('fetchConfig', () => {

		test('Proper actions dispatched', async (done) => {

			const config = {wordSources: ['a', 'b', 'c', 'd'], storySource: 'e'};
			const words = [
				{id: 'a', title: 'A word', words: ['a1', 'a2', 'a3']},
				{id: 'b', title: 'B word', words: ['b1', 'b2', 'b3']},
				{id: 'c', title: 'C word', ref: 'a'},
				{id: 'd', title: 'D word', ref: 'b'}
			];
			const stories = [
				{id: 'a', title: 'A', fields: ['a', 'b', 'd'], template: 'Template A'},
				{id: 'b', title: 'B', fields: ['d', 'a', 'c'], template: 'Template B'}
			];

			const responses = [config, ...words, stories].map(body => ([JSON.stringify(body), {status: 200}]));
			fetch.mockResponses(...responses);

			const actionCount = fnName => dispatchCount[type( actionMap[fnName] )];
			const dispatchCount = { __total__: 0 };

			const dispatch = ({type}) => {
				dispatchCount[type] = (dispatchCount[type] || 0) + 1;
				dispatchCount.__total__++;
				expect(dispatchCount.__total__).toBeLessThan(9);
				if (dispatchCount.__total__ === 8) {
					expect(actionCount('initConfig')).toBe(1);
					expect(actionCount('loadWordList')).toBe(words.length);
					expect(actionCount('loadStories')).toBe(1);
					expect(actionCount('initEntries')).toBe(1);
					expect(actionCount('reconcileConfig')).toBe(1);
					done();
				}
			};

			// test timing
			const minDelay = 1000;
			const start = Date.now();
			await fetchConfig({url: 'a', minDelay})(dispatch);
			const end = Date.now();
			expect(end - start - minDelay).toBeLessThan(50);
		});
	});

	describe('acknowledgeConfigCompletion', () => {

		test('Dispatches on time', async () => {
			const dispatch = jest.fn(({type}) => {
				expect(typeMap[type]).toBe(actionMap.startApplication);
			});

			const delay = 1000;
			const start = Date.now();
			await acknowledgeConfigCompletion(delay)(dispatch);
			const end = Date.now();
			expect(end - start - delay).toBeLessThan(50);
		});

	});

	describe('configReducer', () => {

		let ongoingConfig = {
			loading: false,
			loaded: false,
			wordSources: [],
			storySource: {
				loaded: false
			}
		};

		test('initConfig', () => {

			const input = {
				activationTime: 25,
				wordSources: ['a', 'b'],
				storySource: 'c'
			}

			const expectedConfig = {
				loading: true,
				loaded: false,
				activationTime: 25,
				wordSources: [
					{url: 'a', loaded: false},
					{url: 'b', loaded: false}
				],
				storySource: {url: 'c', loaded: false}
			};

			const action = actionMap.initConfig(input);
			ongoingConfig = configReducer(ongoingConfig, action);
			expect(ongoingConfig).toEqual(expectedConfig);
			expect(ongoingConfig).not.toBe(expectedConfig);
		});

		test('loadWordList', () => {
			const words = [
				{
					id: 'a',
					title: 'A',
					words: ['a1', 'a2']
				},
				{
					id: 'b',
					title: 'B',
					ref: 'a'
				}
			];

			const expectedConfig = {
				loading: true,
				loaded: false,
				activationTime: 25,
				wordSources: [
					{...words[0], loaded: true},
					{url: 'b', loaded: false}
				],
				storySource: {url: 'c', loaded: false}
			};

			let action = actionMap.loadWordList(words[0], 0);
			ongoingConfig = configReducer(ongoingConfig, action);
			expect(ongoingConfig).toEqual(expectedConfig);
			expect(ongoingConfig).not.toBe(expectedConfig);

			expectedConfig.wordSources[1] = {...words[1], loaded: true};
			
			action = actionMap.loadWordList(words[1], 1);
			ongoingConfig = configReducer(ongoingConfig, action);
			expect(ongoingConfig).toEqual(expectedConfig);
			expect(ongoingConfig).not.toBe(expectedConfig);
		});

		test('loadStories', () => {
			const stories = [
				{
					id: 'a',
					title: 'A',
					fields: ['a', 'b'],
					template: 'X'
				},
				{
					id: 'b',
					title: 'B',
					fields: ['b', 'a'],
					template: 'Y'
				}
			];

			const expectedConfig = {...ongoingConfig};
			expectedConfig.storySource = {stories, loaded: true};

			const action = actionMap.loadStories(stories);
			ongoingConfig = configReducer(ongoingConfig, action);
			expect(ongoingConfig).toEqual(expectedConfig);
			expect(ongoingConfig).not.toBe(expectedConfig);
		});

		test('reconcileConfig', () => {
			const expectedConfig = {...ongoingConfig, loaded: true, loading: true};

			const action = actionMap.reconcileConfig();
			ongoingConfig = configReducer(ongoingConfig, action);
			expect(ongoingConfig).toEqual(expectedConfig);
			expect(ongoingConfig).not.toBe(expectedConfig);
		});

		test('startApplication', () => {
			const expectedConfig = {...ongoingConfig, loaded: true, loading: false};

			const action = actionMap.startApplication();
			ongoingConfig = configReducer(ongoingConfig, action);
			expect(ongoingConfig).toEqual(expectedConfig);
			expect(ongoingConfig).not.toBe(expectedConfig);
		});

		test('alien reducer', () => {
			const resultConfig = configReducer(ongoingConfig, {type: 'FOOBAR'});
			expect(resultConfig).toBe(ongoingConfig);
		});
	});

});