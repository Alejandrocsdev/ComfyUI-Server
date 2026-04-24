const { User } = require('../db/mysql/models');

exports.findAll = async () => {
  return User.findAll();
};

exports.create = async (payload = {}) => {
  return User.create(payload);
};

exports.delete = async (userId) => {
  return User.destroy({ where: { id: userId } });
};

exports.findOrCreate = async ({ email, name, avatar }) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { name, avatar, last_login: new Date() },
  });
  if (!created) {
    await user.update({ name, avatar, last_login: new Date() });
  }
  return user;
};
