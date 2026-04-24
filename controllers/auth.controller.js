const jwt = require('jsonwebtoken');
const { url } = require('../utils');
const userService = require('../services/user.service');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

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

  const token = jwt.sign(
    { email: req.user.email, name: req.user.name, avatar: req.user.avatar },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.cookie('token', token, COOKIE_OPTIONS);
  res.redirect(url.client);
};

exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ message: 'Logged out' });
};

exports.me = (req, res) => {
  res.json(req.user);
};
