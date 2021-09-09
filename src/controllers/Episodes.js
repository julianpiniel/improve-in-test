const { EpisodeModel, DirectorModel, TVShowModel } = require('../models');

const readEpisodes = async (req, res, next) => {
	if (req.url.includes('?')) {
		const filter = {};
		if (req.url.includes('director')) filter.director = req.query.director;
		if (req.url.includes('title')) filter.title = req.query.title;
		if (req.url.includes('genre')) filter.genre = req.query.genre;
		if (req.url.includes('show')) {
			try {
				filter.show = await TVShowModel.find({ title: req.query.show });
				if (!filter.show)
					return res.json({ msg: 'Couldnt find that show' });
			} catch (error) {
				console.log(error);
				next(error);
			}
		}
		try {
			const episodes = filter
				? await EpisodeModel.find(filter)
						.populate({ path: 'director', model: DirectorModel })
						.exec()
				: await EpisodeModel.find()
						.populate({ path: 'director', model: DirectorModel })
						.exec();
			if (!episodes)
				return res.status(404).json({ msg: 'Error not found' });
			return res.json(episodes);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		try {
			const episodes = await EpisodeModel.find()
				.populate({ path: 'director', model: DirectorModel })
				.exec();
			if (!episodes) res.status(404).json({ msg: 'Error not found' });
			return res.json(episodes);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
};

const postEpisodes = async (req, res, next) => {
	try {
		const {
			title,
			description,
			release_date,
			genre,
			show,
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
			!show
		)
			return res.status(400).json({ msg: 'Info es missing' });
		const directorId = await DirectorModel.findById({ _id: director });
		const showId = await TVShowModel.find({ title: show });
		if (!showId) return res.status(400).json({ msg: 'Show doesnt exist' });
		const Episode = new EpisodeModel({
			title,
			description,
			release_date,
			genre,
			actors,
			show: showId,
			director: directorId,
		});
		const result = await Episode.save();
		res.json({ msg: 'Episode has been created' });
	} catch (error) {
		next(error);
	}
};

module.exports = { readEpisodes, postEpisodes };
