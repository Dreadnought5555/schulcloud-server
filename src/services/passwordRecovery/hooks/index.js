const hooks = require('feathers-hooks');
const auth = require('feathers-authentication');
const bcrypt = require('bcryptjs');
const local = require('feathers-authentication-local');
const globalHooks = require('../../../hooks');

const hashId = (hook) => {
	if (!hook.data.password) {
		const accountService = hook.app.service('/accounts');

		const { username } = hook.data;
		return accountService.find({
			query: {
				username,
			},
		}).then((account) => {
			account = account[0];
			hook.data.account = account._id;
		});
	}
	return hook;
};

exports.before = {
	all: [],
	find: [auth.hooks.authenticate('jwt'), globalHooks.hasPermission('PWRECOVERY_VIEW')],
	get: [],
	create: [hashId,
		local.hooks.hashPassword({ passwordField: 'password' })],
	update: [auth.hooks.authenticate('jwt'), globalHooks.hasPermission('PWRECOVERY_EDIT')],
	patch: [
		auth.hooks.authenticate('jwt'),
		globalHooks.hasPermission('PWRECOVERY_EDIT'),
		globalHooks.permitGroupOperation,
	],
	remove: [
		auth.hooks.authenticate('jwt'),
		globalHooks.hasPermission('PWRECOVERY_CREATE'),
		globalHooks.permitGroupOperation,
	],
};

exports.after = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: [],
};
