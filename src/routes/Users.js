const {
	readUser,
	createUser,
	updateUser,
	deleteUser,
} = require('../controllers/Users');
const { verifyToken } = require('../middlewares/verifyToken');

const router = require('express').Router();

//router.use(verifyToken);
router
	.route('/')
	.post(createUser)
	.get(verifyToken, readUser)
	.put(verifyToken, updateUser)
	.delete(verifyToken, deleteUser);

module.exports = router;
