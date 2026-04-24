const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const ALLOWED_EMAILS = ['alejandrocsdev@gmail.com', 'franciscobaigs@gmail.com'];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails?.[0]?.value;
      if (!ALLOWED_EMAILS.includes(email)) {
        return done(null, false);
      }
      return done(null, {
        email,
        name: profile.displayName,
        avatar: profile.photos?.[0]?.value,
      });
    }
  )
);

module.exports = passport;
