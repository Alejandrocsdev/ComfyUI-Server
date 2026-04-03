const usersService = require('../services/user.service');

const { asyncHandler } = require('../middlewares');

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await usersService.findAll();
  res.json(users);
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = await usersService.create(req.body);
  res.status(201).json(user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const code = await usersService.delete(userId);
	if (code === 0) {
		return res.status(404).json({ message: 'User not found' });
	}
  res.status(200).json({ message: 'User deleted successfully' });
});