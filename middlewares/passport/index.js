const passport = require('passport');
const googleStrategy = require('./google');
const { url } = require('../../utils');

passport.use('google', googleStrategy);

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});

const googleCallback = passport.authenticate('google', {
  session: false,
  failureRedirect: `${url.client}/login?error=unauthorized`,
});

const passportInit = passport.initialize();

module.exports = { googleAuth, googleCallback, passportInit };
