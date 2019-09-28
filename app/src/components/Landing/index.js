import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { objectEquals, sleep } from '../../common/common';
import { fetchConfig, startApplication } from '../../reducers/config'

import Modal from '../../layouts/Modal';

import Copyright from '../../elements/Copyright';
import Image from '../../elements/Image';
import ProgressIndicator from '../../elements/ProgressIndicator';
import Title from '../../elements/Title';

function extractData({config}) {

	const progress = config.wordSources.reduce(
		({current, total}, {loaded}) => (
			{
				current: loaded ? current++ : current,
				total: total++
			}
		), (
			{
				current: config.storySource.loaded ? 1 : 0,
				total: 1
			}
		)
	);

	return {
		loading: config.loading,
		loaded: config.loaded,
		...progress
	}
}

function Landing() {

	const
		{loaded, loading, current, total} = useSelector(extractData, objectEquals),
		fresh = !loaded && !loading, // app just loaded into page. No config yet
		complete = loaded && loading, // progress is complete, trigger fade, wait, and dispatch completion message
		open = !loaded, // show landing for as long as the config isn't loaded
		dispatch = useDispatch()
	;

	if (fresh) {
		dispatch(fetchConfig("/config/config.json"));
	}

	if (complete) {
		sleep(5000).then( () => dispatch(startApplication()) );
	}

	return (
		<Modal open={open} fade={complete} background="#FFF">
			<Image src="./logo.png" align="center"/>
			<Title>MadLibs, React style</Title>
			<ProgressIndicator current={current} max={total} width="80%" backgroundColor="#DEF" />
			<Copyright/>
		</Modal>
	);

}

export default Landing;