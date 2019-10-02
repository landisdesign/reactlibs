const arrayEquals = (a, b, entryValidator = ((aField, bField) => aField === bField)) => {
	if (!referenceEquals(a, b)) {
		return false;
	}
	if (a.length !== b.length) {
		return false;
	}
	return a.every((aField, index) => entryValidator(aField, b[index]));
};

const buildClassName = styles => name => styles[name];

const buildClassNames = (styles, classNames) => classNames.map(buildClassName(styles)).join(" ");

const cancelEvent = (e) => {
	e.preventDefault();
	e.stopPropagation();
};

const chooseList = (condition, trueList, falseList, additionalList) => {
	const list = condition ? trueList : falseList;
	return additionalList ? list.concat(additionalList) : list;
};

const maskObject = (object, mask) => Object.entries(mask).reduce((acc, [key]) => {if (key in object) acc[key] = object[key]; return acc}, {});

const noop = ()=>{};

const objectEquals = (a, b) => {
	if (!referenceEquals(a, b)) {
		return false;
	}
	const aEntries = Object.entries(a);
	return aEntries.length === Object.keys(b).length && aEntries.every( ([key, value]) => (b[key] === value) );
};

/*
 *	Only use for objects or arrays.
 */
const referenceEquals = (a, b) => {
	if (a === b) {
		return true;
	}
	return !(!a || !b); // one null but the other isn't
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export {
	arrayEquals,
	buildClassName,
	buildClassNames,
	cancelEvent,
	chooseList,
	maskObject,
	noop,
	objectEquals,
	sleep
};