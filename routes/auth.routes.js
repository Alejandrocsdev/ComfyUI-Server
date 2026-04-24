const { Router } = require('express');
const router = Router();
const { authenticate, googleAuth, googleCallback } = require('../middlewares');
const authController = require('../controllers/auth.controller');

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback, authController.googleCallback);
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.me);

module.exports = router;
