import React from 'react';
import { useRouteMatch, Redirect } from 'react-router-dom';

import Landing from './components/Landing';
import Application from './components/Application';

function App() {
	const homeMatch = useRouteMatch({path: '/', exact: true });
	const storyHomeMatch = useRouteMatch({path: '/stories', exact: true});
	const storyMatch = useRouteMatch('/stories/:id');
	const invalidPage = !(homeMatch || storyHomeMatch || storyMatch);

	if (invalidPage) {
		return <Redirect to='/'/>;
	}
	else {
		const id = storyMatch && storyMatch.params.id;
		return (
			<>
				<Landing/>
				<Application id={id}/>
			</>
		);
	}
}

export default App;
