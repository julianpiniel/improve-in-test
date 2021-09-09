const mongoose = require('mongoose');

module.exports = mongoose.Schema(
	{
		name: String,
		mail: String,
		password: String,
	},
	{ versionKey: false }
);
