const { url, jwt, cookie } = require('../utils');
const userService = require('../services/user.service');

exports.googleCallback = async (req, res) => {
  if (!req.user) return res.redirect(`${url.client}/login?error=unauthorized`);

  try {
    await userService.findOrCreate({
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar,
    });
  } catch (err) {
    console.error('[Auth] DB sync failed on login:', err.message);
  }

  const token = jwt.sign({
    email: req.user.email,
    name: req.user.name,
    avatar: req.user.avatar,
  });
  cookie.store(res, token);
  res.redirect(url.client);
};

exports.logout = (req, res) => {
  cookie.clear(res);
  res.json({ message: 'Logged out' });
};

exports.me = (req, res) => {
  res.json(req.user);
};
