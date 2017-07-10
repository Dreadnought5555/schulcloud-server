'use strict';

const service = require('feathers-mongoose');
const filePermissionModel = require('./model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

	const options = {
    Model: filePermissionModel,
    paginate: {
      default: 10000,
      max: 10000
    },
		lean: true
  };

  // Initialize our service with any options it requires
  app.use('/filePermissions', service(options));

  // Get our initialize service to that we can bind hooks
  const filePermissionService = app.service('/filePermissions');

  // Set up our before hooks
  filePermissionService.before(hooks.before);

  // Set up our after hooks
  filePermissionService.after(hooks.after);
};
