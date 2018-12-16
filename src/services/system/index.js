'use strict';

const service = require('feathers-mongoose');
const system = require('./model');
const hooks = require('./hooks');

module.exports = function () {
	const app = this;

	const options = {
		Model: system,
		paginate: {
			default: 5,
			max: 25
		},
		lean: true
	};

	// Initialize our service with any options it requires
	app.use('/systems', service(options));

	// Get our initialize service to that we can bind hooks
	const systemService = app.service('/systems');

	systemService.hooks({
		before: hooks.before,
		after: hooks.after
	});
};
