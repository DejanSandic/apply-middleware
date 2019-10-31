function applyMiddleware(target, ...middlewares) {
	function apply(middleware, rest, args) {
		function next(...newArgs) {
			// If next() was called without arguments
			if (!newArgs.length) newArgs = args;

			const [ nextMiddleware, ...nextRest ] = rest;
			apply(nextMiddleware, nextRest, newArgs);
		}

		if (middleware) middleware(next, ...args);
		else target(...args);
	}

	function execute(...args) {
		const [ middleware, ...rest ] = middlewares;
		apply(middleware, rest, args);
	}

	return maskFnName(execute, target.name);
}

function maskFnName(fn, name, backup) {
	if (!name) name = backup || fn.name || 'anonymous';

	const nameWrapper = {
		[name](...args) {
			fn(...args);
		}
	};

	return nameWrapper[name];
}

module.exports = applyMiddleware;
