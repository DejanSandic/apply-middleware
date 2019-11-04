export type Next = (...newArgs: any[]) => void;

export type Middleware = (next: Next, ...args: any[]) => void;

export default function applyMiddleware (
   target: Function,
   ...middlewares: Middleware[]
) {
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

   function execute (...args: any[]) {
      const [middleware, ...rest] = middlewares;
      apply(middleware, rest, args);
   }

   return execute;
}
