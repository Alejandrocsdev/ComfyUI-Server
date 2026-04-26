const { Strategy } = require('passport-google-oauth20');

const ALLOWED_EMAILS = ['alejandrocsdev@gmail.com', 'franciscobaigs@gmail.com'];

const verifyCallback = (accessToken, refreshToken, profile, done) => {
  const email = profile.emails?.[0]?.value;
  if (!ALLOWED_EMAILS.includes(email)) {
    return done(null, false);
  }
  return done(null, {
    email,
    name: profile.displayName,
    avatar: profile.photos?.[0]?.value,
  });
};

const googleStrategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    proxy: true,
  },
  verifyCallback
);

module.exports = googleStrategy;
