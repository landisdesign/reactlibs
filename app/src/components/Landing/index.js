import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch, Redirect } from 'react-router-dom';

import { fetchConfig, acknowledgeConfigCompletion } from '../../reducers/config';
import { loadStories } from '../../reducers/stories';
import { loadWords } from '../../reducers/words';

import Modal from '../../layouts/Modal';

import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

/**
 *	Presents opening splash modal, triggers config fetching, and triggers state
 *	consolidation before returning control to the application.
 */
function Landing() {

	function extractData({config}) {

		const progress = config.wordSources.reduce(
			({current, total}, {loaded}) => ({
					current: loaded ? ++current : current,
					total: ++total
			}), ({
				current: config.storySource.loaded ? 1 : 0,
				total: 1
			})
		);

		return {
			loading: config.loading,
			loaded: config.loaded,
			...progress,
			stories: config.storySource.stories,
			wordSources: config.wordSources
		}
	}

	// We don't care about the state of stories and wordSource, since we need both and they won't be available until current == total
	function stateUnchanged(a, b) {
		const props = ["loading", "loaded", "current", "total"];
		// eslint-disable-next-line react/prop-types
		return props.every(prop => a[prop] === b[prop]);
	}

	const
		{loaded, loading, current, total, stories, wordSources} = useSelector(extractData, stateUnchanged),
		fresh = !loaded && !loading, // app just loaded into page. No config yet
		complete = loaded && loading, // progress is complete, trigger fade, wait, and dispatch acknowledgement message
		redirect = useRouteMatch({path: "/", exact: true}) && loaded && !loading, // fade is complete, time to redirect
		open = !loaded, // show landing for as long as the config isn't loaded
		dispatch = useDispatch()
	;

	if (fresh) {
		dispatch(fetchConfig( {url: "/development/madlibs/config/config.json", minDelay: 3000} ));
	}

	if (complete) {
		dispatch(loadStories(stories));
		dispatch(loadWords(wordSources));
		dispatch(acknowledgeConfigCompletion(600));
	}

	return redirect ? (
		<Redirect to="/stories"/>
	) : (
		<Modal open={open} fade={complete} background="#FFF" close={false}>
			<Image src="/development/madlibs/logo.png" align="center"/>
			<Title>MadLibs, React style</Title>
			<ProgressIndicator current={current} max={total} width="80%" backgroundColor="#DEF" />
			<Copyright/>
		</Modal>
	);

}

export default Landing;