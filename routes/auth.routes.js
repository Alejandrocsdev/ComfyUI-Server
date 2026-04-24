const { Router } = require('express');
const router = Router();
const passport = require('../config/passport');
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/authenticate');
const { url } = require('../utils');

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${url.client}/login?error=unauthorized`,
  }),
  authController.googleCallback
);

router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);

module.exports = router;
