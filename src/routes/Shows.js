const { verifyToken } = require('../middlewares/verifyToken');
const { readShows, postShows } = require('../controllers/Shows');
const router = require('express').Router();

router.route('/').get(readShows).post(postShows);

module.exports = router;
