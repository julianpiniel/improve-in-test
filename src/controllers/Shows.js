const { TVShowModel, DirectorModel, EpisodeModel } = require('../models');

const readShows = async (req, res, next) => {
	if (req.url.includes('?')) {
		const filter = {};
		if (req.url.includes('director')) filter.director = req.query.director;
		if (req.url.includes('title')) filter.title = req.query.title;
		if (req.url.includes('genre')) filter.genre = req.query.genre;
		try {
			const shows = filter
				? await TVShowModel.find(filter)
						.populate({ path: 'director', model: DirectorModel })
						.exec()
				: await TVShowModel.find()
						.populate(
							{ path: 'director', model: DirectorModel },
							{ path: 'episodes', model: EpisodeModel }
						)
						.exec();
			if (!shows) return res.status(404).json({ msg: 'Error not found' });
			return res.json(shows);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		try {
			const shows = await TVShowModel.find()
				.populate({ path: 'director', model: DirectorModel })
				.exec();
			if (!shows) res.status(404).json({ msg: 'Error not found' });
			return res.json(shows);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
};

const postShows = async (req, res, next) => {
	try {
		const {
			title,
			description,
			release_date,
			seasons,
			genre,
			actors,
			director,
		} = req.body;
		if (
			!title ||
			!description ||
			!release_date ||
			!genre ||
			!actors ||
			!director ||
			!seasons
		)
			return res.status(400).json({ msg: 'Info es missing' });
		const directorId = await DirectorModel.findById({ _id: director });
		const show = new TVShowModel({
			title,
			description,
			release_date,
			genre,
			actors,
			seasons,
			director: directorId,
		});
		const result = await show.save();
		res.json({ msg: 'show has been created' });
	} catch (error) {
		next(error);
	}
};

module.exports = { readShows, postShows };
