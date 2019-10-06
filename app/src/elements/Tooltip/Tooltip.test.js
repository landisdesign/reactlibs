import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ReactTooltip from 'react-tooltip';

import Tooltip from './';
import styles from './Tooltip.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<Tooltip/>', () => {

	test('Outputs properly', ()=> {
		const id = 'test-id';
		const tooltipContent = '<b>Tooltip content</b>';
		const helpedContent = 'Help';

		const tooltip = mount(<Tooltip id={id} content={tooltipContent}>{helpedContent}</Tooltip>); //
		const contentContainer = tooltip.children().first();
		expect(contentContainer.text()).toBe(helpedContent);
		expect(contentContainer.is(`[data-tip][data-for="${id}"]`)).toBe(true);

		const reactTooltip = tooltip.find(ReactTooltip);
		expect(reactTooltip.prop('id')).toBe(id);
		expect(reactTooltip.text()).toBe(tooltipContent);
	});

});
