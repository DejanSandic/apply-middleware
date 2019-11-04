import applyMiddleware, { Next } from '../src/';

function addOne(next: Next, num: number): void {
	next(num + 1);
}

function addDecimal(next: Next, num: number): void {
	next(num + 0.1);
}

function log(num: number) {
	return num;
}

test('should not brake', () => {
	const wrapped = applyMiddleware(log, addOne, addDecimal);
	const result = wrapped(11);

	expect(result).toBe(12.1);
});
