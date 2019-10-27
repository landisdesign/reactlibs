import React from 'react';
import { mount } from 'enzyme';

import MasterDetailLayout, {MasterPanel, DetailPanel} from './';

import styles from './MasterDetailLayout.module.scss';

/*
 *	Note: I place empty line comments after JSX because my editor can't distinguish between closing JSX tags and starting regexes. ¯\_(ツ)_/¯
 */
describe('<MasterDetailLayout/>', () => {

	// Manually adding these to styles to prevent attempts to test invalid class names
	[
		'container',
		'panelHolder',
		'tabHolder',
		'masterPanel',
		'detailPanel',
		'tabs',
		'tab',
		'currentTab',
		'currentPanel'
	].forEach(className => styles[className] = className);

	const getHtmlFromWrapper = wrapper => selector => wrapper.childAt(0).getDOMNode().querySelectorAll(selector);

	test('Basic layout', () => {
		const master = 'master';
		const detail = 'detail';
		const output = mount(<MasterDetailLayout masterLabel={master} detailLabel={detail}>
			<MasterPanel>{master}</MasterPanel>
			<DetailPanel>{detail}</DetailPanel>
		</MasterDetailLayout>); //
		// We do this because we can't match the entire structure without also matching this function
		const switchFunction = output.find('[onClick]').first().prop('onClick');

		const expectedOutput = mount(
			<div className={styles.container}>
				<div className={styles.tabHolder}>
					<ul className={styles.tabs}>
						<li className={styles.currentTab} onClick={switchFunction}>{master}</li>
						<li className={styles.tab} onClick={switchFunction}>{detail}</li>
					</ul>
				</div>
				<div className={styles.panelHolder}>
					<div className={styles.masterPanel + ' ' + styles.currentPanel}>
						{master}
					</div>
					<div className={styles.detailPanel}>
						{detail}
					</div>
				</div>
			</div>
		); //

		expect(output.html()).toBe(expectedOutput.html()); // equals returned components which needed to be stripped for straight test

		output.unmount();
	});

	test('Highlighted detail', () => {
		const master = 'master';
		const detail = 'detail';
		const output = mount(<MasterDetailLayout masterLabel={master} detailLabel={detail} highlightDetail={true}>
			<MasterPanel highlightDetail={true}>{master}</MasterPanel>
			<DetailPanel highlightDetail={true}>{detail}</DetailPanel>
		</MasterDetailLayout>); //

		expect(output.exists('li.' + styles.tab + ' + li.' + styles.currentTab)).toBe(true);
		// need to go through this because panel components are considered part of the dom @_@
		expect(output.exists('div.' + styles.detailPanel + '.' + styles.currentPanel)).toBe(true);
		expect(output.exists('div.' + styles.masterPanel)).toBe(true);
		expect(output.exists('div.' + styles.masterPanel + '.' + styles.currentPanel)).toBe(false);

		output.unmount();
	});

	test('Tabs switched', () => {

		const master = 'master';
		const detail = 'detail';
		const output = mount(<MasterDetailLayout masterLabel={master} detailLabel={detail}>
			<MasterPanel>{master}</MasterPanel>
			<DetailPanel>{detail}</DetailPanel>
		</MasterDetailLayout>); //

		const switchFunction = output.find('li').first().prop('onClick');

		const getHtml = getHtmlFromWrapper(output);
		const tabs = getHtml('li');
		const panels = getHtml('.' + styles.detailPanel + ', .' + styles.masterPanel);

		switchFunction({target: tabs[1]});
		expect(tabs[0].className).toBe(styles.tab);
		expect(tabs[1].className).toBe(styles.currentTab);
		expect(panels[0].className).toBe(styles.masterPanel);
		expect(panels[1].className.split(/\s+/).sort()).toEqual([styles.detailPanel, styles.currentPanel].sort());

		switchFunction({target: tabs[0]});
		expect(tabs[0].className).toBe(styles.currentTab);
		expect(tabs[1].className).toBe(styles.tab);
		expect(panels[0].className.split(/\s+/).sort()).toEqual([styles.masterPanel, styles.currentPanel].sort());
		expect(panels[1].className).toBe(styles.detailPanel);

		output.unmount();
	});

	test('Callback functions', () => {

		const runTest = highlightDetail => {
			const callback = jest.fn();

			const master = 'master';
			const detail = 'detail';
			const output = mount(<MasterDetailLayout masterLabel={master} detailLabel={detail} highlightDetail={highlightDetail} highlightDetailCallback={callback}>
				<MasterPanel highlightDetail={highlightDetail}>{master}</MasterPanel>
				<DetailPanel highlightDetail={highlightDetail}>{detail}</DetailPanel>
			</MasterDetailLayout>); //

			const switchFunction = output.find('li').first().prop('onClick');
			const getHtml = getHtmlFromWrapper(output);
			const tabs = getHtml('li');

			// click unhighlighted tab
			switchFunction({target: tabs[highlightDetail ? 0 : 1]});
			expect(callback.mock.calls).toHaveLength(1);
			// should return the value indicating the not highlighted tab
			expect(callback.mock.calls[0][0]).toBe(!highlightDetail);
			// clicking the highlighted tab should do nothing
			switchFunction({target: tabs[highlightDetail ? 1 : 0]});
			expect(callback.mock.calls).toHaveLength(1);
			output.unmount();
		};

		runTest(false);
		runTest(true);
	})
});