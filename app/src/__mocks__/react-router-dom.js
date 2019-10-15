const { MemoryRouter, Redirect, Route, useRouteMatch } = jest.requireActual('react-router-dom');

let historyData = [];

function setHistory(urls) {
	historyData = [...urls];
}

function getHistory() {
	return [...historyData];
}

function clearHistory() {
	historyData = [];
}

function useHistory() {
	return historyData;
}

export { MemoryRouter, Redirect, Route, useHistory, getHistory, setHistory, clearHistory, useRouteMatch };