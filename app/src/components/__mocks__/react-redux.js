let state = null;
let selectorArguments = [];
let dispatchArguments = [];

const setState = (testState) => {
	state = testState;
};

const dispatch = jest.fn(action => {dispatchArguments.push(action);});

const useDispatch = () => dispatch;

const useSelector = jest.fn((selector, equalityFn) => {
	selectorArguments.push({selector, equalityFn});
	return selector(state);
});

// duplicated from common.js to avoid dependencies
const __sleep = async (time) => (new Promise(resolve => setTimeout(resolve, ms)));

const getDispatchArguments = (expectedCount = 0, maxTime = 5000) => {
	if (expectedCount === 0) {
		return [...dispatchArguments];
	}
	else {
		return async () => {
			const start = Date.now();
			let end = start;
			while ( (end - start < maxTime) && (dispatchArguments.length < expectedCount) ) {
				await __sleep(100);
				end = Date.now();
			}
			return dispatchArguments.length == expectedCount ? [...dispatchArguments] : null;
		};
	}
};

const getUseSelectorArguments = () => selectorArguments.map(selector => ({...selector}));

const clearArguments = () => {
	selectorArguments.length = 0;
	dispatchArguments.length = 0;
	dispatch.mockClear();
	useSelector.mockClear();
};

export { setState, useDispatch, useSelector, getDispatchArguments, getUseSelectorArguments, clearArguments };