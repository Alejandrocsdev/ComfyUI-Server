const isProduction = process.env.NODE_ENV === 'production';

const config = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const clearConfig = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
};

const store = (res, token) => res.cookie('token', token, config);

const clear = (res) => res.clearCookie('token', clearConfig);

module.exports = { store, clear };
