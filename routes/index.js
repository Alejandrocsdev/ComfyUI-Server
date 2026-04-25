const { Router } = require('express');
const router = Router();
const authenticate = require('../middlewares/authenticate');

const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const comfyuiRoutes = require('./comfyui.routes');
const runpodRoutes = require('./runpod.routes');
const s3Routes = require('./s3.routes');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/comfyui', authenticate, comfyuiRoutes);
router.use('/runpod', authenticate, runpodRoutes);
router.use('/s3', authenticate, s3Routes);

module.exports = router;
