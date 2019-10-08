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

const getDispatchArguments = () => [...dispatchArguments];

const getUseSelectorArguments = () => selectorArguments.map(selector => ({...selector}));

const clearArguments = () => {
	selectorArguments.length = 0;
	dispatchArguments.length = 0;
	dispatch.mockClear();
	useSelector.mockClear();
};

export { setState, useDispatch, useSelector, getDispatchArguments, getUseSelectorArguments, clearArguments };