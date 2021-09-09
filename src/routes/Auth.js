const { verifyToken } = require('../middlewares/verifyToken');
const { login, logout, renew } = require('../middlewares/Auth');
const router = require('express').Router();

router.route('/').post(login).get(logout);
router.route('/renew').get(renew);

module.exports = router;
