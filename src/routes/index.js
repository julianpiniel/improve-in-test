const express = require('express'),
	router = express.Router();

const users = require('./Users'),
	auth = require('./Auth'),
	movies = require('./Movies');

router.use('/users', users);
router.use('/auth', auth);
router.use('/movies', movies);

module.exports = router;
