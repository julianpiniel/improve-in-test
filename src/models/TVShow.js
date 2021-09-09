const mongoose = require('mongoose');

module.exports = mongoose.Schema(
	{
		title: String,
		description: String,
		release_date: Date,
		genre: String,
		seasons: Number,
		episodes: Array,
		actors: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'actors',
			},
		],
		director: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'directors',
		},
	},
	{ versionKey: false }
);
