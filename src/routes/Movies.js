const { verifyToken } = require('../middlewares/verifyToken');
const { readMovies, postMovies } = require('../controllers/Movies');
const router = require('express').Router();

router.use(verifyToken);
router.route('/').get(readMovies).post(postMovies);

module.exports = router;
