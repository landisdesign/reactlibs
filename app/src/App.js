import React from 'react';
import Landing from './layouts/Landing';
import Application from './layouts/Application';
import './App.css';

function App() {

	const loading = false;
	return (
		loading ? <Landing/> : <Application/>
	);
}

export default App;
