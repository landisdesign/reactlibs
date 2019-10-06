import { setOutput, setRandom, setStoryIndex, setShowEMail, setShowStory, setWillClear, uiReducer } from './ui';

describe('uiReducer', () => {
	
	let initialConfig;

	beforeEach( () => {
		initialConfig = {
			isRandom: false,
			showStory: false,
			showEMail: false,
			transitionEMail: false,
			storyIndex: -1,
			output: '',
			willClear: false
		};
	});

	test('setOutput', () => {
		const output = 'test';
		const expectedConfig = {...initialConfig, output};

		const resultConfig = uiReducer(initialConfig, setOutput(output));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('setRandom', () => {
		const isRandom = true;
		const expectedConfig = {...initialConfig, isRandom};

		const resultConfig = uiReducer(initialConfig, setRandom(isRandom));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('setStoryIndex', () => {
		const storyIndex = 5;
		const expectedConfig = {...initialConfig, storyIndex};

		const resultConfig = uiReducer(initialConfig, setStoryIndex(storyIndex));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('setShowEMail', () => {
		const showEMail = true;
		const transitionEMail = false;
		initialConfig.transitionEMail = true; // I want to ensure that both flags are set independently.
		const expectedConfig = {...initialConfig, showEMail, transitionEMail};

		const resultConfig = uiReducer(initialConfig, setShowEMail(showEMail, transitionEMail));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('setShowStory', () => {
		const showStory = true;
		const expectedConfig = {...initialConfig, showStory};

		const resultConfig = uiReducer(initialConfig, setShowStory(showStory));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('setWillClear', () => {
		const willClear = true;
		const expectedConfig = {...initialConfig, willClear};

		const resultConfig = uiReducer(initialConfig, setWillClear(willClear));
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).not.toBe(initialConfig);
	});

	test('bogus reducer', () => {
		const expectedConfig = {...initialConfig};

		const resultConfig = uiReducer(initialConfig, {type: 'foobar'});
		expect(resultConfig).toEqual(expectedConfig);
		expect(resultConfig).toBe(initialConfig);
	});
});