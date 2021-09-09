const mongoose = require('mongoose');

module.exports = mongoose.Schema(
	{
		name: String,
		birth_date: Date,
		nationality: String,
		movies: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'movies',
			},
		],
		shows: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'shows',
			},
		],
	},
	{ versionKey: false }
);
