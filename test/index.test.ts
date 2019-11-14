import applyMiddleware, { Next } from '../src/';

const addOne = jest.fn((next: Next, num: number) => {
	next(num + 1);
});

const doNothing = jest.fn((next: Next) => {
	next();
});

const addDecimal = jest.fn((next: Next, num: number) => {
	next(num + 0.1);
});

const target = jest.fn();

const next = expect.anything();

test('applyMiddleware should invoke the target function with data modified by the middleware functions.', () => {
	const wrapped = applyMiddleware(target, addOne, doNothing, addDecimal);
	wrapped(11);
	expect(addOne).toBeCalledWith(next, 11);
	expect(doNothing).toBeCalledWith(next, 12);
	expect(addDecimal).toBeCalledWith(next, 12);
	expect(target).toBeCalledWith(12.1);
});

test('applyMiddleware should invoke the target function with data modified by the middleware functions.', () => {
	const num: any = 11;

	const fn1 = () => applyMiddleware(num, addOne);
	expect(fn1).toThrowError('All arguments passed to the applyMiddleware function need to be functions.');

	const fn2 = () => applyMiddleware(target, addOne, doNothing, num, addDecimal);
	expect(fn2).toThrowError('All arguments passed to the applyMiddleware function need to be functions.');
});
