import {
	arrayEquals,
	buildClassName,
	buildClassNames,
	cancelEvent,
	chooseList,
	maskObject,
	noop,
	objectEquals,
	sleep
} from './common';

describe('arrayEquals', () => {

	test('Passing same array is equal', () => {
		const obj = [];
		expect(arrayEquals(obj, obj)).toBe(true);
	});

	test('Passing null arrays is equal', () => {
		expect(arrayEquals(null, null)).toBe(true);
	});

	test('Passing one null and one non-null reference is unequal', () => {
		expect(arrayEquals([], null)).toBe(false);
		expect(arrayEquals(null, [])).toBe(false);
	})

	test('Empty arrays equal', () => {
		expect(arrayEquals([],[])).toEqual(true);
	});

	test('Unequal length arrays are unequal', () => {
		expect(arrayEquals([], [true])).toBe(false);
		expect(arrayEquals([true], [])).toBe(false);
	});

	describe('Default validator', () => {
		test('Equal values equal', () => {
			expect(arrayEquals([true], [true])).toBe(true);
			expect(arrayEquals(["a", "b"], ["a", "b"])).toBe(true);
			expect(arrayEquals([0, undefined, false], [0, undefined, false])).toBe(true);
			const testObj = {};
			expect(arrayEquals([testObj], [testObj])).toBe(true);
		});

		test('Unequal values are unequal', () => {
			expect(arrayEquals([true], [1])).toBe(false);
			expect(arrayEquals(["a", 1], ["a", "1"])).toBe(false);
			expect(arrayEquals([false, true], [undefined, true])).toBe(false);
			expect(arrayEquals([{}], [{}])).toBe(false);
		});
	});

	describe('Provided validator', () => {
		test('Validator called and return value used', () => {

			const expectValidator = (validator, length) => {
				expect(validator.mock.calls.length).toBe(length);
				validator.mock.calls.forEach( (call, index) => {
					expect(call[0]).toBe(testA[index]);
					expect(call[1]).toBe(testB[index]);
				});
			}

			const testA = [{a: "a"}, {b: "b"}];
			const testB = testA.map(x => ({...x}) );
			const testTrueValidator = jest.fn(() => true);
			const testFalseValidator = jest.fn(() => false);
			expect(arrayEquals(testA, testB, testTrueValidator)).toBe(true);
			expect(arrayEquals(testA, testB, testFalseValidator)).toBe(false);
			expectValidator(testTrueValidator, testA.length); // should go through entire test array
			expectValidator(testFalseValidator, 1); // should exit after first false
		});

		test('Null validator should error', () => {
			const testA = [true];
			const testB = [true];
			expect(() => {
				arrayEquals(testA, testB, null);
			}).toThrow();
		})
	});
});

describe('buildClassName', () => {
	const testStyles = {
		a: "x",
		b: "y",
		c: "z"
	};

	test('Returns function that returns style based upon name', () => {
		const testFunction = buildClassName(testStyles);
		expect(testFunction("a")).toBe(testStyles.a);
	});
});

describe('buildClassNames', () => {
	const testStyles = {
		a: "x",
		b: "y",
		c: "z"
	};

	test('Returns values based on provided array and styles object', () => {
		expect(buildClassNames(testStyles, ["a", "b", "c"])).toBe("x y z");
	});
});

describe('cancelEvent', () => {
	const e = {
		preventDefault: jest.fn(()=>{}),
		stopPropagation: jest.fn(()=>{})
	};

	test('cancelEvent calls proper methods on provided event', () => {

		cancelEvent(e);

		Object.entries(e).map(([key, fn]) => {
			expect(fn.mock.calls.length).toBe(1);
		});
	});
});

describe('chooseList', () => {
	const trueList = ["true1", "true2"];
	const falseList = ["false1", "false2"];
	const addlList = ["addl1", "addl2"];

	test('true returns proper list', () => {
		expect(chooseList(true, trueList, falseList)).toEqual(trueList);
	});

	test('false returns proper list', () => {
		expect(chooseList(false, trueList, falseList)).toEqual(falseList);
	});

	test('true with add\'l list returns proper list', () => {
		expect(chooseList(true, trueList, falseList, addlList)).toEqual([...trueList, ...addlList]);
	});

	test('false with add\'l list returns proper list', () => {
		expect(chooseList(false, trueList, falseList, addlList)).toEqual([...falseList, ...addlList]);
	});
});

describe('maskObject', () => {
	const testObject = {
		a: "a",
		b: "b",
		c: "c"
	};

	test('Mask removes extra props', () => {
		const testMask = {
			a: true,
			b: null
		};
		const testResult = {
			a: testObject.a,
			b: testObject.b
		};

		expect(maskObject(testObject, testMask)).toEqual(testResult);
	});

	test('Mask doesn\'t add extra props', () => {
		const testMask = {
			a: true,
			b: null,
			d: 1
		};
		const testResult = {
			a: testObject.a,
			b: testObject.b
		};

		expect(maskObject(testObject, testMask)).toEqual(testResult);
	});
});

describe('noop', () => {
	test('Does nothing', () => {
		expect(noop()).toBeUndefined();
	});
});

describe('objectEquals', () => {
	const objA = {
		a: true,
		b: 1,
		c: null
	};
	const objB = {...objA};
	const objC = {
		a: true,
		b: 1
	};
	const objD = {
		a: "true",
		b: 1,
		c: null
	};
	const objE = {};

	test('Same object is equal', () => {
		expect(objectEquals(objA, objA)).toBe(true);
	});

	test('Null objects are equal', () => {
		expect(objectEquals(null, null)).toBe(true);
	});

	test('Null reference doesn\'t equal non-null reference.', () => {
		expect(objectEquals(null, objA)).toBe(false);
		expect(objectEquals(objA, null)).toBe(false);
	});

	test('Identical objects are equal', () => {
		expect(objectEquals(objA, objB)).toBe(true);
	});

	test('Objects with identical but not all entries are unequal', () => {
		expect(objectEquals(objA, objC)).toBe(false);
		expect(objectEquals(objC, objA)).toBe(false);
	});

	test('Unequal objects are unequal', () => {
		expect(objectEquals(objA, objD)).toBe(false);
		expect(objectEquals(objD, objA)).toBe(false);
	});
})

describe('sleep', () => {
	test('Sleep pauses for specific time', async () => {
		const start = Date.now();
		await sleep(1000);
		const end = Date.now();

		expect(end - start - 1000).toBeLessThan(20);
	});
});