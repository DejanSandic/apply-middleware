import applyMiddleware, { Next } from '../src/';

function addOne (next: Next, num: number): void {
   next(num + 1);
}

function addDecimal (next: Next, num: number): void {
   next(num + 0.1);
}

test('should not brake', () => {
   let testNum: number;

   function log (num: number) {
      testNum = num;
   }

   const wrapped = applyMiddleware(log, addOne, addDecimal);
   wrapped(11);

   expect(testNum).toBe(12.1);
});
