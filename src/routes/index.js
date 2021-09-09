const express = require('express'),
	router = express.Router();

const users = require('./Users'),
	auth = require('./Auth'),
	movies = require('./Movies'),
	episodes = require('./Episodes');

router.use('/users', users);
router.use('/auth', auth);
router.use('/movies', movies);
router.use('/shows', episodes);

module.exports = router;
