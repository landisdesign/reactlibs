let state = null;
let selectorArguments = [];
let dispatchArguments = [];

const setState = (testState) => {
	state = testState;
};

const getState = () => state;

const getDummyState = () => ({
	config: {
		loading: false,
		loaded: true,
		storySource: {
			url: 'a',
			loaded: true
		},
		wordSources: [
			{
				url: 'b',
				loaded: true
			},
			{
				url: 'c',
				loaded: true
			}
		]
	},
	entries: [
		['a1', 'a2', 'a3'],
		['b1', 'b2', 'b3'],
	],
	stories: {
		idMap: {
			'a': 0,
			'b': 1
		},
		stories: [
			{
				id: 'a',
				title: 'Story A',
				fields: ['wa', 'wb', 'wb'],
				template: 'Story A: {{1}} {{2}} {{3}}'
			},
			{
				id: 'b',
				title: 'Story B',
				fields: ['wa', 'wa', 'wb'],
				template: 'Story B: {{1}}! {{2}}! {{3}}!'
			}
		]
	},
	words: {
		wa: {
			id: 'wa',
			title: 'Word A',
			words: ['wa1', 'wa2', 'wa3']
		},
		wb: {
			id: 'wb',
			title: 'Word B',
			words: ['wb1', 'wb2', 'wb3']
		}
	},
	ui: {
		isRandom: false,
		showStory: false,
		showEMail: false,
		transitionEMail: false,
		storyIndex: -1,
		output: '',
		willClear: false
	}
});

const dispatch = jest.fn(action => {dispatchArguments.push(action);});

const useDispatch = () => dispatch;

const useSelector = jest.fn((selector, equalityFn) => {
	selectorArguments.push({selector, equalityFn});
	return selector(state);
});

// duplicated from common.js to avoid dependencies
const __sleep = async (time) => (new Promise(resolve => setTimeout(resolve, time)));

const getDispatchArguments = (expectedCount = 0, maxTime = 5000) => {
	if (expectedCount === 0) {
		return [...dispatchArguments];
	}
	else {
		return new Promise((processArgs, rejectArgs) => {

			const test = (start, duration) => (resolveTest, rejectTest) => {
				__sleep(100).then(() => {
					if (dispatchArguments.length < expectedCount) {
						const end = Date.now();
						if (end - start < duration) {
							resolveTest(new Promise(test(start, duration)));
						}
						else {
							rejectTest([...dispatchArguments]);
						}
					}
					else {
						resolveTest([...dispatchArguments]);
					}
				});
			};

			return ( new Promise(test(Date.now(), maxTime)) ).then(processArgs, rejectArgs);
		});
	}
};

const getUseSelectorArguments = () => selectorArguments.map(selector => ({...selector}));

const clearArguments = () => {
	selectorArguments.length = 0;
	dispatchArguments.length = 0;
	dispatch.mockClear();
	useSelector.mockClear();
};

export { setState, getState, getDummyState, useDispatch, useSelector, getDispatchArguments, getUseSelectorArguments, clearArguments };