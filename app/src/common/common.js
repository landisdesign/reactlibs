
const buildClassName = styles => name => styles[name];

const buildClassNames = (styles, classNames) => classNames.map(buildClassName(styles)).join(" ");

const chooseList = (condition, trueList, falseList, additionalList) => {
	const list = condition ? trueList : falseList;
	return additionalList ? list.concat(additionalList) : list;
};

const objectEquals = (a, b) => {
	const aEntries = Object.entries(a);
	let data = [];
	let test = aEntries.length == Object.keys(b).length && aEntries.every( ([key, value]) => data.push(key + "\n\ta: " + value + "\n\tb: " + b[key]) && (b[key] == value) );
//	alert(data.join("\n\n"));
	return test;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export {
	buildClassName,
	buildClassNames,
	chooseList,
	objectEquals,
	sleep
};