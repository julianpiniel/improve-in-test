const mongoose = require('mongoose');
require('dotenv').config();

const { MONGO_DB_URI, MONGO_DB_TEST, NODE_ENV } = process.env;

const tvShowSchema = require('./TVShow'),
	movieSchema = require('./Movie'),
	directorSchema = require('./Director'),
	actorSchema = require('./Actor'),
	userSchema = require('./User');

const connectionString =
	NODE_ENV === 'test' ? MONGO_DB_TEST : 'mongodb://localhost:27017/improve';

mongoose
	.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log(`Connected to ${connectionString}`))
	.catch((error) => console.log('error:', error));

const TVShowModel = mongoose.model('shows', tvShowSchema),
	MovieModel = mongoose.model('movies', movieSchema),
	DirectorModel = mongoose.model('directors', directorSchema),
	ActorModel = mongoose.model('actors', actorSchema),
	UserModel = mongoose.model('users', userSchema);

module.exports = {
	TVShowModel,
	MovieModel,
	DirectorModel,
	ActorModel,
	UserModel,
};
