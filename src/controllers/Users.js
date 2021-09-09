const { UserModel } = require('../models');
const bcrypt = require('bcrypt');

const createUser = async (req, res, next) => {
	try {
		const { name, mail, password } = req.body;
		if (!name || !mail || !password)
			return res.status(400).json({ msg: 'Info es missing' });

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new UserModel({
			name,
			mail,
			password: hashedPassword,
		});
		const result = await user.save();
		res.json({ msg: 'User has been created' });
	} catch (error) {
		next(error);
	}
};

const readUser = async (req, res, next) => {
	try {
		const users = await UserModel.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const { id, name, mail, password } = req.body;
		if (!name || !mail || !password || !id)
			return res.status(400).json({ msg: 'Info es missing' });
		const originalUser = await UserModel.findById({ _id: id });
		const user = await UserModel.updateOne(
			{
				_id: id,
			},
			{
				$set: {
					name: name ? name : originalUser.name,
					mail: mail ? eail : originalUser.mail,
					password: password ? password : originalUser.password,
				},
			}
		);
		res.json({ msg: 'User successfully updated' });
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.body;
		if (!id || id.length < 10)
			return res.status(400).json({ msg: 'Please enter a valid id' });
		const user = await UserModel.deleteOne({ _id: id });
		res.json({ msg: 'User successfully deleted' });
	} catch (error) {
		next(error);
	}
};

module.exports = { createUser, readUser, updateUser, deleteUser };
