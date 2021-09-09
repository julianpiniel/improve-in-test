const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/index');
const bcrypt = require('bcrypt');

const login = async (req, res, next) => {
	try {
		const { mail, password } = req.body;
		if (!mail || !password)
			return res.status(400).json({ msg: 'Info es missing' });
		const user = await UserModel.find({ mail: mail });
		if (!user) return res.status(404).json({ msg: 'user not found' });
		if (bcrypt.compareSync(password, user[0].password)) {
			const token = jwt.sign({ id: user._id }, 'mysecretkey', {
				expiresIn: 60 * 30,
			}); //1 day duration

			return res.status(200).json({
				user: user,
				auth: true,
				token: token,
			});
		}
		return res.status(401).json({ auth: false, token: null });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const logout = (req, res) => {
	return res.status(200).send({
		auth: false,
		token: null,
	});
};

const renew = async (req, res, next) => {
	try {
		const oldToken = req.headers['x-access-token'];
		if (!oldToken)
			return res
				.status(401)
				.json({ auth: false, message: 'No token was provided' });
		const decoded = await jwt.verify(oldtoken, 'mysecretkey');
		// get the decoded id
		const { id } = decoded;
		//finding user
		const user = await UserModel.findById({ _id: id });
		//create a new token
		const newToken = jwt.sign({ id: user._id }, 'mysecretkey', {
			expiresIn: 60 * 30, // 60*30 = 30min
		});
		//return newtoken
		return res.status(200).json({
			auth: true,
			token: newToken,
		});
	} catch (error) {
		res.status(400).json({ error: error });
	}
};

module.exports = { login, logout, renew };
