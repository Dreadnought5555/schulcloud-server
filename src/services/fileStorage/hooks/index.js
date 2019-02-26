const auth = require('feathers-authentication');
const { hasPermission, injectUserId } = require('../../../hooks');

const resolveUserId = (hook) => {
	// local workaround if authentication is disabled
	hook.params.payload = hook.params.payload || hook.data.userPayload;
	hook.params.account = hook.params.account || hook.data.account;
	hook.params.payload.userId = hook.params.account.userId || '';
	return hook;
};

const replaceAnd = (hook) => {
	if (hook.data.name)
		hook.data.name = hook.data.name.replace(/&amp;/g, '&');
	else if (hook.data.newName)
		hook.data.newName = hook.data.newName.replace(/&amp;/g, '&');
};

const resolveStorageType = (hook) => {
	const { params: { payload } } = hook;

	return hook.app.service('users').find({
		query: {
			_id: payload.userId,
			$populate: ['schoolId'],
		},
	}).then((res) => {
		const [{ schoolId: { _id, fileStorageType } }] = res.data;
		payload.schoolId = _id;
		payload.fileStorageType = fileStorageType;
		return hook;
	});
};

exports.before = {
	all: [
		auth.hooks.authenticate('jwt'),
		injectUserId,
		resolveUserId,
		resolveStorageType,
	],
	find: [hasPermission('FILESTORAGE_VIEW')],
	get: [hasPermission('FILESTORAGE_VIEW')],
	create: [hasPermission('FILESTORAGE_CREATE'), replaceAnd],
	update: [hasPermission('FILESTORAGE_EDIT')],
	patch: [hasPermission('FILESTORAGE_EDIT'), replaceAnd],
	remove: [hasPermission('FILESTORAGE_REMOVE')],
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
