'use strict';
const errors = require('feathers-errors');

// Add any common hooks you want to share across services in here.


// don't require authentication for internal requests
exports.ifNotLocal = function (hookForRemoteRequests) {
	//const hashPassword = hooks.hashPassword(options);
	//const secondHook = options.function;

	return function (hook) {
		if (typeof(hook.params.provider) != 'undefined') {	// meaning it's not a local call
			// Call the specified hook
			return hookForRemoteRequests.call(this, hook);
		}
	};
};


exports.isAdmin = function (options) {
	return hook => {
		if(!(hook.params.user.permissions || []).includes('ADMIN')) {
			throw new errors.Forbidden('you are not an administrator');
		}
		//console.log('My custom global hook ran. Feathers is awesome!');
		return Promise.resolve(hook);
	};
};
