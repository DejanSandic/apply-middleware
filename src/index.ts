export type Next = (...newArgs: any[]) => void;

export type Middleware = (next: Next, ...args: any[]) => void;

export default function applyMiddleware (target: Function, ...middlewares: Middleware[]) {
   // Verify all arguments passed to the the applyMiddleware function are functions
   for (const arg of arguments) {
      if (typeof arg !== 'function') {
         throw new Error('All arguments passed to the applyMiddleware function need to be functions.');
      }
   }

   // Function which recursively iterates over the middlewares
   function apply (middleware: Middleware, rest: Middleware[], args: any[]) {
      function next (...newArgs: any[]) {
         // If next() was called without arguments
         if (!newArgs.length) newArgs = args;

         const [nextMiddleware, ...nextRest] = rest;
         apply(nextMiddleware, nextRest, newArgs);
      }

      if (middleware) middleware(next, ...args);
      else target(...args);
   }

   // Function which starts iteration over middlewares
   function execute (...args: any[]) {
      const [middleware, ...rest] = middlewares;
      apply(middleware, rest, args);
   }

   return execute;
}
