
const buildClassName = styles => name => styles[name];

const buildClassNames = (styles, classNames) => classNames.map(buildClassName(styles)).join(" ");

const chooseList = (condition, trueList, falseList, additionalList) => {
	const list = condition ? trueList : falseList;
	return additionalList ? list.concat(additionalList) : list;
};

const objectEquals = (a, b) => {
	const aEntries = Object.entries(a);
	return aEntries.length === Object.keys(b).length && aEntries.every( ([key, value]) => (b[key] === value) );
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export {
	buildClassName,
	buildClassNames,
	chooseList,
	objectEquals,
	sleep
};