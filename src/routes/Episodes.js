const { verifyToken } = require('../middlewares/verifyToken');
const { readEpisodes, postEpisodes } = require('../controllers/Episodes');
const router = require('express').Router();

router.use(verifyToken);
router.route('/').get(readEpisodes).post(postEpisodes);

module.exports = router;
