const { MovieModel, DirectorModel } = require('../models');

const readMovies = async (req, res, next) => {
	if (req.url.includes('?')) {
		const filter = {};
		if (req.url.includes('director')) filter.director = req.query.director;
		if (req.url.includes('title')) filter.title = req.query.title;
		if (req.url.includes('genre')) filter.genre = req.query.genre;
		try {
			const movies = filter
				? await MovieModel.find(filter)
						.populate({ path: 'director', model: DirectorModel })
						.exec()
				: await MovieModel.find()
						.populate({ path: 'director', model: DirectorModel })
						.exec();
			if (!movies)
				return res.status(404).json({ msg: 'Error not found' });
			return res.json(movies);
		} catch (error) {
			console.log(error);
			next(error);
		}
	} else {
		try {
			const movies = await MovieModel.find()
				.populate({ path: 'director', model: DirectorModel })
				.exec();
			if (!movies) res.status(404).json({ msg: 'Error not found' });
			return res.json(movies);
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
};

const postMovies = async (req, res, next) => {
	try {
		const { title, description, release_date, genre, actors, director } =
			req.body;
		if (
			!title ||
			!description ||
			!release_date ||
			!genre ||
			!actors ||
			!director
		)
			return res.status(400).json({ msg: 'Info es missing' });
		const directorId = await DirectorModel.findById({ _id: director });
		const movie = new MovieModel({
			title,
			description,
			release_date,
			genre,
			actors,
			director: directorId,
		});
		const result = await movie.save();
		res.json({ msg: 'Movie has been created' });
	} catch (error) {
		next(error);
	}
};

module.exports = { readMovies, postMovies };
