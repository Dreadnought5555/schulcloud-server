const mongoose = require('mongoose');
const config = process.env.NODE_ENV === 'test'
	? require('../../config/test.json')
	: require('../../config/default.json'); // TODO add production

async function setup() {
	await mongoose.connect(
		process.env.DB_URL || config.mongodb,
		{ user: process.env.DB_USERNAME, pass: process.env.DB_PASSWORD },
	);
}

async function cleanup() {
	return mongoose.connection.close();
}

module.exports = { setup, cleanup };
